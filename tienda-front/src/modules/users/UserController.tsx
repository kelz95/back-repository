import axios, { AxiosError, AxiosResponse } from "axios";

import asyncWrapper from "#root/lib/asyncWrapper";
import { BASE_URL_API } from "#root/lib/constants";
import { PaginatedResponse } from "#root/lib/types";
import { useAuthStore } from "#root/modules/auth/useAuthStore";

import { User } from "./types";

const userRequest = axios.create({
  baseURL: `${BASE_URL_API}/api/v1/users`,
});

userRequest.interceptors.request.use(
  async config => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers = { Authorization: `Bearer ${accessToken}` };
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

userRequest.interceptors.response.use(
  response => response,
  async error => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken && error.response.status === 401) {
      useAuthStore.getState().nullify();
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

type CreatePayload = Partial<User>;
type UpdatePayload = Partial<User>;

type PaginationParams = {
  page: number;
  size: number;
};

type ErrorResponse = {
  codigo: string;
  mensaje: string;
};

class UserController {
  static async getAll(params: PaginationParams) {
    const [apiRes, error] = await asyncWrapper<AxiosResponse<PaginatedResponse<User>>, AxiosError>(
      userRequest.get("/", { params })
    );
    return [apiRes, error] as const;
  }

  static async getOne(id: number) {
    const [apiRes, error] = await asyncWrapper<AxiosResponse<User>, AxiosError>(
      userRequest.get(`/${id}`)
    );
    return [apiRes, error] as const;
  }

  static async create(payload: CreatePayload) {
    const [apiRes, error] = await asyncWrapper<AxiosResponse<User>, AxiosError<ErrorResponse>>(
      userRequest.post("/", payload)
    );
    return [apiRes, error] as const;
  }

  static async update(id: number, payload: UpdatePayload) {
    const [apiRes, error] = await asyncWrapper<AxiosResponse, AxiosError>(
      userRequest.put(`/${id}`, payload)
    );
    return [apiRes, error] as const;
  }

  static async deleteOne(id: number) {
    const [apiRes, error] = await asyncWrapper<AxiosResponse, AxiosError>(
      userRequest.delete(`/${id}`)
    );
    return [apiRes, error] as const;
  }

  static async export() {
    const [apiRes, error] = await asyncWrapper<AxiosResponse, AxiosError>(
      userRequest.get("/exportar")
    );
    return [apiRes, error] as const;
  }
}

export default UserController;
