export type Product = {
  idProduct: number;

  // @ManyToOne(fetch = FetchType.EAGER)
  // @JoinColumn(name="id_product_category")
  // private ProductCategory productCategory;

  code: string;

  name: string;

  description: string;

  quantity: number;

  unitPrice: number;

  pictures: string;

  creationDate?: Date;

  modificationDate?: Date;
};
