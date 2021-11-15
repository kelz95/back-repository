/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { namespaces } from "#root/translations/i18n.constants";

import Copyright from "#root/components/Copyright";
import Loading from "#root/components/Loading";
import NavBar from "#root/components/NavBar";
import Toolbar from "#root/components/Toolbar";
import useDebounce from "#root/lib/hooks/useDebounce";
import useTableOptions from "#root/lib/hooks/useTableOptions";
import CategoriesTable from "#root/modules/categories/CategoriesTable";
import CategoryController from "#root/modules/categories/CategoryController";
import CreateCategoryModal from "#root/modules/categories/CreateCategoryModal";
import UpdateCategoryModal from "#root/modules/categories/UpdateCategoryModal";
import DeleteCategoryDialog from "#root/modules/categories/DeleteCategoryDialog";
import { useCategoryStore } from "#root/modules/categories/useCategoryStore";
import { Category } from "#root/modules/categories/types";

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
  const { t } = useTranslation(namespaces.pages.products);
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

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    const [res, err] = await CategoryController.getAll();
    if (err) {
      enqueueSnackbar(`${t("error")}`, { variant: "error" });
      setIsLoading(false);
      return;
    }

    const receivedCategories = res?.data || [];

    useCategoryStore.getState().setCategories(receivedCategories);
    setCategories(receivedCategories);
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

    const [res, err] = await ProductController.getAll({
      page: dataTableOptions.pageIndex,
      size: dataTableOptions.pageSize,
      name: encodeURI(debouncedSearchString),
    });
    if (err) {
      enqueueSnackbar(`${t("error")}`, { variant: "error" });
      setIsLoading(false);
      return;
    }

    setProducts(res?.data.content || []);
    setIsLoading(false);
  }, [dataTableOptions.pageIndex, dataTableOptions.pageSize, debouncedSearchString]);

  const handleCreate = () => {
    setIsCreateProductModalOpen(true);
  };

  const handleEdit = (currentProduct: Product) => {
    console.log("edit", currentProduct);
  };

  const handleDelete = (id: number) => {
    console.log("delete", id);
  };

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
        <Typography component="h1" variant="h3" marginBottom="2rem" marginTop="1rem">
          {t("inventory")}
        </Typography>

        <Typography component="h2" variant="h4" marginBottom="2rem" marginTop="1rem">
          {t("products")}
        </Typography>

        <Toolbar
          createButtonText={t("cProduct")}
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
          {t("categories")}
        </Typography>

        <Toolbar createButtonText={t("cCategory")} onCreate={handleCreateCategory} />
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
