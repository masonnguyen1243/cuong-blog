import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import DashboardProfile from "~/components/Dashboard/DashboardProfile";
import DashboardSidebar from "~/components/Dashboard/DashboardSidebar";
import DashPost from "~/components/Post/DashPost";
import DashUser from "~/components/users/DashUser";
import DashComment from "~/components/Comment/DashComment";
import DashboardOverview from "~/components/Dashboard/DashboardOverview";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashboardSidebar />
      </div>

      {/* Profile */}
      {tab === "profile" && <DashboardProfile />}

      {/* Posts */}
      {tab === "posts" && <DashPost />}

      {/* Users */}
      {tab === "users" && <DashUser />}

      {/* Comments */}
      {tab === "comments" && <DashComment />}

      {/* Dashboard overview */}
      {tab === "dash" && <DashboardOverview />}
    </div>
  );
};
export default Dashboard;
