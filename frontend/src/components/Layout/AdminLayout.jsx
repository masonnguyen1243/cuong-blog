import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const { user } = useSelector((state) => state.auth);

  return user && user?.data?.role === "admin" ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to={"/sign-in"} />
  );
};
export default AdminLayout;
