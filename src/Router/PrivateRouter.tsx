import { Outlet, Navigate } from "react-router-dom";

export const AuthPrivateRouter = () => {
  const userdata = localStorage.getItem("userdata");
  return !userdata ? <Outlet /> : <Navigate to={"/dash"} />;
};

export const HomePrivateRouter = () => {
  const userdata = localStorage.getItem("userdata");
  return userdata ? <Outlet /> : <Navigate to={"/login"} />;
};
