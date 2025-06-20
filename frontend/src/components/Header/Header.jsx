import {
  Button,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LogoutUser } from "~/store/slice/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const path = useLocation().pathname;
  const [isOpenModel, setIsOpenModel] = useState(false);
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleLogout = () => {
    toast
      .promise(dispatch(LogoutUser()), {
        pending: "Loading",
      })
      .then((res) => {
        if (!res.error) {
          navigate("/sign-in");
          toast.success("Logged out successfully!");
        }
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Navbar className="border-b-2">
        <Link
          to={"/"}
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 rounded-lg text-white">Cuong's</span>Blog
        </Link>

        <form>
          <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
          />
        </form>
        <Button className="w-12 h-10 lg:hidden" color={"gray"} pill>
          <AiOutlineSearch />
        </Button>

        <div className="flex gap-4 md:order-2 items-center">
          <Button
            className="w-12 h-10 hidden sm:inline cursor-pointer"
            color={"gray"}
            pill
          >
            <FaMoon />
          </Button>

          <div className="relative">
            {user ? (
              <p
                onClick={() => setIsOpenModel(!isOpenModel)}
                className="text-white select-none cursor-pointer hover:underline underline-offset-4"
              >
                {user.data.rest.username}
              </p>
            ) : (
              <Link to={"/sign-in"}>
                <Button className="cursor-pointer" outline>
                  Sign in
                </Button>
              </Link>
            )}

            {isOpenModel && (
              <div className="bg-white w-30 right-0 mt-3 absolute shadow-md p-2">
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-md cursor-pointer bg-red-500 text-white w-full hover:opacity-90"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink active={path === "/"} as={"div"}>
            <Link to={"/"}>Home</Link>
          </NavbarLink>
          <NavbarLink active={path === "/about"} as={"div"}>
            <Link to={"/about"}>About</Link>
          </NavbarLink>
          <NavbarLink active={path === "/projects"} as={"div"}>
            <Link to={"/projects"}>Projects</Link>
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};
export default Header;
