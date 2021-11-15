import create from "zustand";
import { combine } from "zustand/middleware";

import { Category } from "./types";

export const useCategoryStore = create(
  combine(
    {
      categories: [] as Category[],
    },
    set => ({
      setCategories: (c: Category[]) => set({ categories: c }),
      nullify: () => set({ categories: [] }),
    })
  )
);
