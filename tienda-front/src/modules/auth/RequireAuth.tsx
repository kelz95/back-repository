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

  const isAuthenticated = user && accessToken;

  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} />;

  if (allowedRoles && allowedRoles.length > 0) {
    const isUserRoleAllowed = user.roles.some(role => allowedRoles.includes(role));
    if (!isUserRoleAllowed) return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default RequireAuth;
