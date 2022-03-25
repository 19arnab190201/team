import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
const ProtectedRoute = ({ children }) => {
  const { userData } = useUserAuth();

  console.log("Check user in Private: ", userData);
  if (!userData) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
