import axios, { AxiosError, AxiosResponse } from "axios";

import asyncWrapper from "../../lib/asyncWrapper";
import { BASE_URL_API } from "../../lib/constants";
import { useTokenStore } from "./stores/useTokenStore";

const authRequest = axios.create({
  baseURL: `${BASE_URL_API}/api/auth`,
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
  roles: string[];
};

class AuthController {
  static async signIn(payload: SignInRequest) {
    const [res, err] = await asyncWrapper<AxiosResponse<SignInResponse>, AxiosError>(
      authRequest.post("/signin", payload)
    );
    if (err || !res) {
      return { data: null, error: err?.message };
    }
    useTokenStore.getState().setAccessToken(res.data.token);

    return { data: res.data, error: null };
  }
}

export default AuthController;
