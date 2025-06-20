import axios from "axios";

import { toast } from "react-toastify";

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

// Interceptors response can thiệp vào giữa những cái response API nhận về
authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    //

    return response;
  },
  (error) => {
    let errorMessage = error?.message;
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message;
    }

    toast.error(errorMessage);

    return Promise.reject(error);
  }
);

export default authorizeAxiosInstance;
