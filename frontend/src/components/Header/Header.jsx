import {
  Button,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

const Header = () => {
  const path = useLocation().pathname;

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

        <div className="flex gap-4 md:order-2">
          <Button
            className="w-12 h-10 hidden sm:inline cursor-pointer"
            color={"gray"}
            pill
          >
            <FaMoon />
          </Button>

          <Link to={"/sign-in"}>
            <Button className="cursor-pointer" outline>
              Sign in
            </Button>
          </Link>

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
