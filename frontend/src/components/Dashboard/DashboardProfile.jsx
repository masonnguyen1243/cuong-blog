import { Button, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import authorizeAxiosInstance from "~/utils/authorizeAxios";

const DashboardProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const filePickerRef = useRef();
  const [blogData, setBlogData] = useState({
    avatar: [],
  });

  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const { data } = await authorizeAxiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/change-avatar`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setBlogData((prev) => ({
        ...prev,
        avatar: [...prev.avatar, data.data.avatar],
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleChangeImage}
          ref={filePickerRef}
          hidden
        />
        <div
          onClick={() => filePickerRef.current.click()}
          className="w-32 h-32 cursor-pointer shadow-md overflow-hidden rounded-full self-center"
        >
          <img
            src={blogData.avatar}
            alt="avatar"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={user?.data?.rest?.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={user?.data?.rest?.email}
        />
        <TextInput type="password" id="password" placeholder="password" />
        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-400 to-blue-400 cursor-pointer"
        >
          Update
        </Button>
      </form>
    </div>
  );
};
export default DashboardProfile;
