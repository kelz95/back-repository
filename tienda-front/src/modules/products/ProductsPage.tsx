/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Copyright from "#root/components/Copyright";
import Loading from "#root/components/Loading";
import NavBar from "#root/components/NavBar";
import Toolbar from "#root/components/Toolbar";
import useDebounce from "#root/lib/hooks/useDebounce";
import useTableOptions from "#root/lib/hooks/useTableOptions";
import { namespaces } from "#root/translations/i18n.constants";

import CategoryController from "../categories/CategoryController";
import CategoriesTable from "../categories/CategoriesTable";
import { Category } from "../categories/types";
import CreateProductModal from "./CreateProductModal";
import ProductController from "./ProductController";
import ProductsTable from "./ProductsTable";
import { Product } from "./types";
import CreateCategoryModal from "../categories/CreateCategoryModal";
import UpdateCategoryModal from "../categories/UpdateCategoryModal";
import DeleteCategoryDialog from "../categories/DeleteCategoryDialog";

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
  // const { t, i18n } = useTranslation(namespaces.pages.products);
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false);
  const [isUpdateCategoryModalOpen, setIsUpdateCategoryModalOpen] = useState(false);
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [clickedCategory, setClickedCategory] = useState<Category | null>(null);
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

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    const [res, err] = await CategoryController.getAll();
    if (err) {
      enqueueSnackbar("Algo salió mal", { variant: "error" });
      setIsLoading(false);
      return;
    }

    setCategories(res?.data || []);
    setIsLoading(false);
  }, []);

  const handleCreateCategory = () => {
    setIsCreateCategoryModalOpen(true);
  };
  const handleEditCategory = (c: Category) => {
    setClickedCategory(c);
    setIsUpdateCategoryModalOpen(true);
  };
  const handleDeleteCategory = (c: Category) => {
    setClickedCategory(c);
    setIsDeleteCategoryModalOpen(true);
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

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="lg">
        {/* <Typography component="h1" variant="h3" marginBottom="2rem" marginTop="1rem">
          {t("title")}
        </Typography> */}
        <Typography component="h1" variant="h3" marginBottom="2rem" marginTop="1rem">
          Inventory
        </Typography>

        <Typography component="h2" variant="h4" marginBottom="2rem" marginTop="1rem">
          Products
        </Typography>

        <Toolbar
          createButtonText="Create product"
          onCreate={handleCreate}
          searchValue={dataTableOptions.searchString}
          setSearchValue={dataTableOptions.setSearchString}
          withSearchBar
        />

        <ProductsTable
          data={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
          page={dataTableOptions.pageIndex}
          rowsPerPage={dataTableOptions.pageSize}
          setPage={dataTableOptions.setPageIndex}
          setRowsPerPage={dataTableOptions.setPageSize}
        />

        <Typography component="h2" variant="h4" marginBottom="2rem" marginTop="1rem">
          Categories
        </Typography>

        <Toolbar createButtonText="Create category" onCreate={handleCreateCategory} />
        <CategoriesTable
          data={categories}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
        />

        <Copyright marginTop="2rem" />
      </Container>

      <Loading isOpen={isLoading} />

      <CreateProductModal
        isOpen={isCreateProductModalOpen}
        onClose={() => setIsCreateProductModalOpen(false)}
      />
      <CreateCategoryModal
        isOpen={isCreateCategoryModalOpen}
        onClose={() => setIsCreateCategoryModalOpen(false)}
        onCreateCategory={fetchCategories}
      />
      <UpdateCategoryModal
        data={clickedCategory}
        isOpen={isUpdateCategoryModalOpen}
        onClose={() => setIsUpdateCategoryModalOpen(false)}
        onUpdateCategory={fetchCategories}
      />
      <DeleteCategoryDialog
        data={clickedCategory}
        isOpen={isDeleteCategoryModalOpen}
        onClose={() => setIsDeleteCategoryModalOpen(false)}
        onDeleteCategory={fetchCategories}
      />
    </>
  );
};

export default ProductsPage;
