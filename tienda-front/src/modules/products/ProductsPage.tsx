/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import Copyright from "#root/components/Copyright";
import Loading from "#root/components/Loading";
import NavBar from "#root/components/NavBar";
import Toolbar from "#root/components/Toolbar";
import useDebounce from "#root/lib/hooks/useDebounce";
import useTableOptions from "#root/lib/hooks/useTableOptions";

import CreateProductModal from "./CreateProductModal";
import ProductController from "./ProductController";
import ProductsTable from "./ProductsTable";
import { Product } from "./types";

const defaultProducts: Product[] = [
  {
    idProduct: 1,
    code: "code1",
    description: "descripcion1",
    name: "name1",
    pictures: "",
    quantity: 10,
    unitPrice: 15.5,
  },
  {
    idProduct: 2,
    code: "code2",
    description: "descripcion2",
    name: "name2",
    pictures: "",
    quantity: 12,
    unitPrice: 10.5,
  },
];

const ProductsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const dataTableOptions = useTableOptions<Product>({});
  const debouncedSearchString = useDebounce(dataTableOptions.searchString, 300);

  const handleCreate = () => {
    console.log("create");
    setIsCreateProductModalOpen(true);
  };

  const handleEdit = (currentProduct: Product) => {
    console.log("edit", currentProduct);
  };

  const handleDelete = (id: number) => {
    console.log("delete", id);
  };

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    const url = `/api/v1/products?page${dataTableOptions.pageIndex}&size=${
      dataTableOptions.pageSize
    }&name=${encodeURI(debouncedSearchString)}`;
    console.log(url);

    const [res, err] = await ProductController.getAll({
      page: dataTableOptions.pageIndex,
      size: dataTableOptions.pageSize,
      name: encodeURI(debouncedSearchString),
    });
    console.log({ res, err });

    // const [resOperators, errOperators] = await OperatorController.fetchAll({
    //   limit: String(dataTableOptions.limit),
    //   offset: String(dataTableOptions.offset),
    //   searchString: dataTableOptions.searchString,
    // });
    // if (errOperators) {
    //   toast({ title: "Algo salió mal", status: "error" });
    //   setIsLoading(false);
    //   return;
    // }
    // const contentRangeHeader = resOperators?.headers["content-range"];
    // const totalFromHeader = contentRangeHeader?.split("/").pop() || "0";
    // dataTableOptions.setTotalRows(parseInt(totalFromHeader, 10));
    // setProducts(resOperators?.data || []);
    setProducts(defaultProducts);
    setIsLoading(false);
  }, [dataTableOptions.pageIndex, dataTableOptions.pageSize, debouncedSearchString]);

  useEffect(() => {
    fetchProducts();
  }, [dataTableOptions.pageIndex, dataTableOptions.pageSize, debouncedSearchString]);

  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="lg">
        <Typography component="h1" variant="h4" marginBottom="2rem" marginTop="1rem">
          Products Inventory
        </Typography>

        <Toolbar
          searchValue={dataTableOptions.searchString}
          setSearchValue={dataTableOptions.setSearchString}
          onCreate={handleCreate}
        />

        <Loading isOpen={isLoading} />
        <ProductsTable
          data={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
          page={dataTableOptions.pageIndex}
          rowsPerPage={dataTableOptions.pageSize}
          setPage={dataTableOptions.setPageIndex}
          setRowsPerPage={dataTableOptions.setPageSize}
        />

        <Copyright marginTop="2rem" />
      </Container>
      <CreateProductModal
        isOpen={isCreateProductModalOpen}
        onClose={() => setIsCreateProductModalOpen(false)}
      />
    </>
  );
};

export default ProductsPage;
