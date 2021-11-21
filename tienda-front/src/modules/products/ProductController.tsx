import axios, { AxiosError, AxiosResponse } from "axios";

import asyncWrapper from "#root/lib/asyncWrapper";
import { BASE_URL_API } from "#root/lib/constants";
import { PaginatedResponse } from "#root/lib/types";
import { useAuthStore } from "#root/modules/auth/useAuthStore";

import { Product } from "./types";

const productRequest = axios.create({
  baseURL: `${BASE_URL_API}/api/v1/products`,
});

productRequest.interceptors.request.use(
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

productRequest.interceptors.response.use(
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
type UpdateDataPayload = Partial<Product>;
type UpdateImagePayload = FormData;

type PaginationParams = {
  page: number;
  size: number;
  name?: string;
  categoria?: string;
  fechaCreacion?: string;
};

class ProductController {
  static async getAll(params: PaginationParams) {
    const [apiRes, error] = await asyncWrapper<
      AxiosResponse<PaginatedResponse<Product>>,
      AxiosError
    >(productRequest.get("/", { params }));
    return [apiRes, error] as const;
  }

  static async getOne(id: number) {
    const [apiRes, error] = await asyncWrapper<AxiosResponse<Product>, AxiosError>(
      productRequest.get(`/${id}`)
    );
    return [apiRes, error] as const;
  }

  static async create(payload: CreatePayload) {
    const [apiRes, error] = await asyncWrapper<AxiosResponse<Product>, AxiosError>(
      productRequest.post("/", payload, { headers: { "content-type": "multipart/form-data" } })
    );
    return [apiRes, error] as const;
  }

  static async updateData(id: number, payload: UpdateDataPayload) {
    const [apiRes, error] = await asyncWrapper<AxiosResponse, AxiosError>(
      productRequest.put(`/${id}`, payload)
    );
    return [apiRes, error] as const;
  }

  static async updateImage(id: number, payload: UpdateImagePayload) {
    const [apiRes, error] = await asyncWrapper<AxiosResponse, AxiosError>(
      productRequest.put(`/${id}/upload`, payload)
    );
    return [apiRes, error] as const;
  }

  static async deleteOne(id: number) {
    const [apiRes, error] = await asyncWrapper<AxiosResponse, AxiosError>(
      productRequest.delete(`/${id}`)
    );
    return [apiRes, error] as const;
  }

  static async export() {
    const [apiRes, error] = await asyncWrapper<AxiosResponse, AxiosError>(
      productRequest.get("/exportar", { responseType: "blob" })
    );
    return [apiRes, error] as const;
  }
}

export default ProductController;
