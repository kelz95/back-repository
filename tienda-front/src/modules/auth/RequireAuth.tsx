import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

import { FALLBACK_ROUTE_LOGGED_IN } from "#root/lib/constants";

import { Role } from "./types";
import { useAuthStore } from "./useAuthStore";

type RequireAuthProps = {
  allowedRoles?: Role[];
  children: ReactNode;
};

const RequireAuth = ({ allowedRoles, children }: RequireAuthProps) => {
  const { user, accessToken } = useAuthStore();
  const location = useLocation();

  const isAuthenticated = user && accessToken;

  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} />;

  if (allowedRoles && allowedRoles.length > 0) {
    const isUserRoleAllowed = user.roles.some(role => allowedRoles.includes(role));
    if (!isUserRoleAllowed)
      return <Navigate to={FALLBACK_ROUTE_LOGGED_IN} state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default RequireAuth;
