import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GetCurrentUser, LogoutUser } from "~/store/slice/authSlice";
import { toast } from "react-toastify";
import { toggleTheme } from "~/store/theme/themeSlice";
import { useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const path = useLocation().pathname;
  const { currentUser, loading, error } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    dispatch(GetCurrentUser());
  }, [dispatch]);

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

        <div className="flex items-center gap-4 md:order-2">
          <Button
            className="w-12 h-10 hidden sm:inline cursor-pointer"
            color={"gray"}
            pill
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "light" ? <FaSun /> : <FaMoon />}
          </Button>

          <div className="relative">
            {currentUser ? (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt="user"
                    img={
                      currentUser?.data?.rest?.avatar ||
                      currentUser?.data?.avatar
                    }
                    rounded
                    className="cursor-pointer"
                  />
                }
              >
                <DropdownHeader className="flex items-center gap-2 justify-center flex-col">
                  <span className="black text-sm select-none">
                    @
                    {currentUser?.data?.rest?.username ||
                      currentUser?.data?.username}
                  </span>
                  <span className="black text-sm font-medium truncate select-none">
                    {currentUser?.data?.rest?.email || currentUser?.data?.email}
                  </span>
                </DropdownHeader>
                <Link to={"/dashboard?tab=profile"}>
                  <DropdownItem>Profile</DropdownItem>
                  <DropdownDivider />
                  <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
                </Link>
              </Dropdown>
            ) : (
              <Link to={"/sign-in"}>
                <Button className="cursor-pointer" outline>
                  Sign in
                </Button>
              </Link>
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
