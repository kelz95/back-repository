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

type CreatePayload = FormData;
type UpdateDataPayload = Partial<User>;
type UpdateImagePayload = FormData;

type PaginationParams = {
  page: number;
  size: number;
  name?: string;
  categoria?: string;
  fechaCreacion?: string;
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
    const [apiRes, error] = await asyncWrapper<AxiosResponse<User>, AxiosError>(
      userRequest.post("/", payload, { headers: { "content-type": "multipart/form-data" } })
    );
    return [apiRes, error] as const;
  }

  static async updateData(id: number, payload: UpdateDataPayload) {
    const [apiRes, error] = await asyncWrapper<AxiosResponse, AxiosError>(
      userRequest.put(`/${id}`, payload)
    );
    return [apiRes, error] as const;
  }

  static async updateImage(id: number, payload: UpdateImagePayload) {
    const [apiRes, error] = await asyncWrapper<AxiosResponse, AxiosError>(
      userRequest.put(`/${id}/upload`, payload)
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
