import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

import { useAuthStore } from "./useAuthStore";

type RequireAuthProps = {
  allowedRoles?: string[];
  children: ReactNode;
};

const RequireAuth = ({ allowedRoles, children }: RequireAuthProps) => {
  const { user, accessToken } = useAuthStore();
  const location = useLocation();

  if (allowedRoles && allowedRoles.length > 0) {
    if (user && user.roles) return <Navigate to="/login" state={{ from: location }} />;
  }

  if (!user || !accessToken) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default RequireAuth;
