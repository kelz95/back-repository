import axios, { AxiosError, AxiosResponse } from "axios";

import asyncWrapper from "../../lib/asyncWrapper";
import { BASE_URL_API } from "../../lib/constants";
import { Role } from "./types";
import { useAuthStore } from "./useAuthStore";

const authRequest = axios.create({
  baseURL: `${BASE_URL_API}/api/v1/auth`,
});

type SignInRequest = {
  username: string;
  password: string;
};

type SignInResponse = {
  id: number;
  token: string;
  type: string; // "Bearer"
  username: string;
  roles: Role[];
};

type SignInError = {
  codigo: number;
  mensaje: string;
};

class AuthController {
  static async signIn(payload: SignInRequest) {
    const [res, err] = await asyncWrapper<AxiosResponse<SignInResponse>, AxiosError<SignInError>>(
      authRequest.post("/signin", payload)
    );
    if (err || !res) {
      return { data: null, error: err?.response?.data.mensaje || err?.message };
    }
    useAuthStore.getState().setAccessToken(res.data.token);
    useAuthStore.getState().setUser({
      id: res.data.id,
      roles: res.data.roles,
      username: res.data.username,
    });

    return { data: res.data, error: null };
  }

  static async signOut() {
    useAuthStore.getState().nullify();
  }
}

export default AuthController;
