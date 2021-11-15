import { Category } from "../categories/types";

export type Product = {
  idProduct: number;

  productCategory: Category;

  code: string;
  name: string;
  description: string;

  quantity: number;
  unitPrice: number;

  picture: string;

  creationDate?: string;
  modificationDate?: string | null;
};
