import create from "zustand";
import { combine, persist } from "zustand/middleware";

import { User } from "./types";

const AUTH_STORE_KEY = "@pineapple/auth";

export const useAuthStore = create(
  persist(
    combine(
      {
        user: null as User | null,
        accessToken: "",
      },
      set => ({
        setUser: (u: User) => set({ user: u }),
        setAccessToken: (x: string) => set({ accessToken: x }),
        nullify: () => set({ user: null, accessToken: "" }),
      })
    ),
    {
      name: AUTH_STORE_KEY,
    }
  )
);
