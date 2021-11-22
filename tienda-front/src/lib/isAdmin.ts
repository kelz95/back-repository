import { User } from "#root/modules/auth/types";

const isAdmin = (user: User | null) => {
  return user?.roles.some(role => role === "ROLE_ADMIN");
};

export default isAdmin;
