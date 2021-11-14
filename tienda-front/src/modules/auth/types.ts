export type Role = "ROLE_ADMIN" | "ROLE_USER";

export type User = {
  id: number;
  username: string;
  roles: Role[];
  // token: string;
  // type: string;
};
