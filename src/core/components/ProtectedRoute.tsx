import React from "react";

import { Navigate, Outlet } from "react-router-dom";

import { useUserAuthService } from "../../authentication/hooks/use-user-auth-service";
import { UserAuthService } from "../../authentication/interfaces/user-auth.interface";

const ProtectedRoute = ({ redirectPath = '/', children }) => {

  const userAuthService: UserAuthService = useUserAuthService();

  if (!userAuthService.currentUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;