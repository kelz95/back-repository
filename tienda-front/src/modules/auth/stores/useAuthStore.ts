import create from "zustand";
import { combine } from "zustand/middleware";

import { User } from "../types";

export const useAuthStore = create(
  combine(
    {
      user: null as User | null,
    },
    set => ({
      setUser: (u: User) => set({ user: u }),
      nullify: () => set({ user: null }),
    })
  )
);
