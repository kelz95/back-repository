import axios, { AxiosError, AxiosResponse } from "axios";

import asyncWrapper from "#root/lib/asyncWrapper";
import { BASE_URL_API } from "#root/lib/constants";
import { useAuthStore } from "#root/modules/auth/useAuthStore";

import { Category } from "./types";

const categoryRequest = axios.create({
  baseURL: `${BASE_URL_API}/api/v1/categories`,
});

categoryRequest.interceptors.request.use(
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

categoryRequest.interceptors.response.use(
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

type CreatePayload = Partial<Category>;
type UpdatePayload = Partial<Category>;

class CategoryController {
  static async getAll() {
    const [apiRes, error] = await asyncWrapper<AxiosResponse<Category[]>, AxiosError>(
      categoryRequest.get("/")
    );
    return [apiRes, error] as const;
  }

  static async getOne(id: number) {
    const [apiRes, error] = await asyncWrapper<AxiosResponse<Category>, AxiosError>(
      categoryRequest.get(`/${id}`)
    );
    return [apiRes, error] as const;
  }

  static async create(payload: CreatePayload) {
    const [apiRes, error] = await asyncWrapper<AxiosResponse<Category>, AxiosError>(
      categoryRequest.post("/", payload)
    );
    return [apiRes, error] as const;
  }

  static async update(id: number, payload: UpdatePayload) {
    const [apiRes, error] = await asyncWrapper<AxiosResponse, AxiosError>(
      categoryRequest.put(`/${id}`, payload)
    );
    return [apiRes, error] as const;
  }

  static async deleteOne(id: number) {
    const [apiRes, error] = await asyncWrapper<AxiosResponse, AxiosError>(
      categoryRequest.delete(`/${id}`)
    );
    return [apiRes, error] as const;
  }

  static async export() {
    const [apiRes, error] = await asyncWrapper<AxiosResponse, AxiosError>(
      categoryRequest.get("/exportar")
    );
    return [apiRes, error] as const;
  }
}

export default CategoryController;
