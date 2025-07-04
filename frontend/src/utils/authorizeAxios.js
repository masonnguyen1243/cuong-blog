import axios from "axios";
import { toast } from "react-toastify";
import { LogoutUser } from "~/store/slice/authSlice";
import { refreshTokenApi } from "~/components/apis";

/**
 * Không thể import { store } from '~/redux/store' theo cách thông thường ở đây
 * Giải pháp: Inject store: là kỹ thuật khi cần sử dụng redux store ở các file ngoài phạm vi component
 như file authorizeAxios hiện tại
 * Hiểu đơn giản: Khi ứng dụng bắt đầu chạy lên, code sẽ chạy vào main.jsx đầu tiên, từ bên đó ta gọi
 hàm injectStore ngay lập tức để gán biến mainStore vào biến axiosReduxStore cục bộ trong file này.
 * https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
 */
let axiosReduxStore;
export const injectStore = (mainstore) => {
  axiosReduxStore = mainstore;
};

//Khởi tạo 1 đối tượng Axios (authorizeAxiosInstance) mục đích để custom và cấu hình chung cho dự án
let authorizeAxiosInstance = axios.create();

//Thời gian chờ tối đa của 1 request: để 10 phút
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10;

//withCredential: Sẽ cho phép axios gửi cookie trong mỗi request lên BE (phục vụ việc chúng ta sẽ lưu JWT Token (refresh and access) vào httpOnly Cookie của trình duyệt)
authorizeAxiosInstance.defaults.withCredentials = true;

// Interceptors request can thiệp vào giữa những cái request API
authorizeAxiosInstance.interceptors.request.use(
  (config) => {
    //

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Khởi tạo 1 promise cho việc gọi api refreshToken
// Mục đích tạo Promise này để khi nào gọi api refreshToken xong xuôi thì mới retry lại nhiều api bị lỗi trước đố
// https://www.thedutchlab.com/inzichten/using-axios-interceptors-for-refreshing-your-api-token
let refreshTokenPromise = null;

// Interceptors response can thiệp vào giữa những cái response API nhận về
authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    //

    return response;
  },
  (error) => {
    // Xử lý RefreshToken tự động
    // Gọi api refresh token để làm mới lại accessToken
    const originalRequests = error.config;
    console.log("🚀 ~ originalRequests:", originalRequests);

    if (error.response?.status && !originalRequests._retry) {
      // Gán thêm một giá trị _retry = true trong khoảng thời gian chờ, đảm bảo việc refresh token này chỉ luôn gọi 1 lần tại 1 thời điểm (nhìn lại điều kiện if ngay phía trên)
      originalRequests._retry = true;

      // Kiểm tra xem nếu chưa có refreshTokenPromise thì thực hiện gán việc gọi api refresh_token đồng thời gán vào cho cái refreshTokenPromise
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenApi()
          .then((data) => {
            // Đồng thời accesstoken đã nằm trong httpOnly cookie (xử lý phía BE)
            return data?.accessToken;
          })
          .catch((_error) => {
            // Nếu có bất kỳ lỗi nào => Logout luôn
            axiosReduxStore.dispatch(LogoutUser());
            return Promise.reject(_error);
          })
          .finally(() => {
            // Dù api có ok hay lỗi thì vẫn luôn gán lại cái refreshTokenPromise về null như ban đầu
            refreshTokenPromise = null;
          });
      }

      // Cần return trường hợp refreshTokenPromise chạy thành công và xử lý thêm ở đây:
      // eslint-disable-next-line no-unused-vars
      return refreshTokenPromise.then((accessToken) => {
        // Return lại axios instance của chúng ta kết hợp các originalRequests để gọi lại những api ban đầu bị lỗi
        return authorizeAxiosInstance(originalRequests);
      });
    }

    // Xử lý lỗi (nếu có)
    let errorMessage = error?.message;
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message;
    }

    toast.error(errorMessage);

    return Promise.reject(error);
  }
);

export default authorizeAxiosInstance;
