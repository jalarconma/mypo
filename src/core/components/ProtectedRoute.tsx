import React, { useState } from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useUserAuthService } from "../../authentication/hooks/use-user-auth-service";
import { UserAuthService } from "../../authentication/interfaces/user-auth.interface";

const ProtectedRoute = ({ redirectPath = '/login', children }) => {

  const userAuthService: UserAuthService = useUserAuthService();
  const location = useLocation();

  if (!userAuthService.currentUser) {
    return <Navigate to={redirectPath} state={{ prevRoute: location }} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;