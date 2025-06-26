import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { HiArrowSmRight, HiDocumentText, HiUser } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "~/store/slice/authSlice";
import { toast } from "react-toastify";

const DashboardSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState("");

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleLogout = () => {
    toast
      .promise(dispatch(LogoutUser()), {
        pending: "Loading",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Logged out successfully!");
          navigate("/sign-in");
        }
      });
  };

  return (
    <Sidebar className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup className="flex flex-col gap-1">
          <Link to={"/dashboard?tab=profile"}>
            <SidebarItem
              active={tab === "profile"}
              icon={HiUser}
              label={`${user?.data?.role === "user" ? "User" : "Admin"}`}
              labelColor="dark"
              className="cursor-pointer"
              as={"div"}
            >
              Profile
            </SidebarItem>
          </Link>
          {user?.data?.role === "admin" && (
            <Link to={"/dashboard?tab=posts"}>
              <SidebarItem
                active={tab === "posts"}
                icon={HiDocumentText}
                labelColor="dark"
                className="cursor-pointer"
                as={"div"}
              >
                Posts
              </SidebarItem>
            </Link>
          )}
          <SidebarItem
            onClick={handleLogout}
            icon={HiArrowSmRight}
            className="cursor-pointer"
          >
            Logout
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};
export default DashboardSidebar;
