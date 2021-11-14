export type Role = {
  id: number;
  code: "ROLE_ADMIN" | "ROLE_USER";
  description: string;
};

export type User = {
  idUser: number;
  role: Role;
  username: string;
  password?: string;
  email: string;
  name: string;
  lastname: string;
  lastName: string;
  activo: boolean;
  createAt?: Date;
};
