import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LogoutUser } from "~/store/slice/authSlice";
import { toast } from "react-toastify";

const DashboardSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState("");

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
          <SidebarItem
            active={tab === "profile"}
            icon={HiUser}
            label={"User"}
            labelColor="dark"
            className="cursor-pointer"
            as={"div"}
          >
            <Link to={"/dashboard?tab=profile"}>Profile</Link>
          </SidebarItem>
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
