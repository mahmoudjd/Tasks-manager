import React from "react";
import Login from "../pages/Login";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ component }: { component: JSX.Element }) => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Login />;
  }

  return component;
};
export default ProtectedRoute;
