import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateLayout = () => {
  const { user } = useSelector((state) => state.auth);

  return user ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to={"/sign-in"} />
  );
};
export default PrivateLayout;
