export type RoleCode = "ROLE_ADMIN" | "ROLE_VIEWER";

export type Role = {
  id: number;
  code: RoleCode;
  description: string;
};

export type User = {
  idUser: number;
  role: Partial<Role>;
  username: string;
  password?: string;
  email: string;
  name: string;
  lastname: string;
  lastName: string;
  activo: boolean;
  createAt?: Date;
};
