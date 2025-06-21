import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

const DashboardProfile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 cursor-pointer shadow-md overflow-hidden rounded-full self-center">
          <img
            src={user?.data?.rest?.avatar}
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
