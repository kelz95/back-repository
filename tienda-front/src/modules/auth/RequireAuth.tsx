import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "./stores/useAuthStore";

type RequireAuthProps = {
  allowedRoles?: string[];
  children: ReactNode;
};

const RequireAuth = ({ allowedRoles, children }: RequireAuthProps) => {
  const { user } = useAuthStore();
  const location = useLocation();

  if (allowedRoles && allowedRoles.length > 0) {
    if (user && user.roles) return <Navigate to="/login" state={{ from: location }} />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default RequireAuth;
