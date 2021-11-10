import create from "zustand";
import { combine } from "zustand/middleware";

export const useTokenStore = create(
  combine(
    {
      accessToken: "",
    },
    set => ({
      setAccessToken: (accessToken: string) => set({ accessToken }),
      clearTokens: () => set({ accessToken: "" }),
    })
  )
);
