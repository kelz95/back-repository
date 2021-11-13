export type Role = "ROL_ADMIN" | "ROL_USER";

export type User = {
  id: number;
  username: string;
  roles: Role[];
  // token: string;
  // type: string;
};
