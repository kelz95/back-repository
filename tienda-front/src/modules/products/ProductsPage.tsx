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
import downloadFile from "#root/lib/downloadFile";
import useDebounce from "#root/lib/hooks/useDebounce";
import useTableOptions from "#root/lib/hooks/useTableOptions";
import CategoryController from "#root/modules/categories/CategoryController";
import { useCategoryStore } from "#root/modules/categories/useCategoryStore";

import CreateProductModal from "./CreateProductModal";
import DeleteProductDialog from "./DeleteProductDialog";
import ProductController from "./ProductController";
import ProductsTable from "./ProductsTable";
import { Product } from "./types";
import UpdateProductModal from "./UpdateProductModal";

const ProductsPage = () => {
  const { t } = useTranslation(namespaces.translation);
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);
  const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] = useState(false);
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [clickedProduct, setClickedProduct] = useState<Product | null>(null);

  const dataTableOptions = useTableOptions<Product>({});
  const debouncedSearchString = useDebounce(dataTableOptions.searchString, 300);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    const [res, err] = await CategoryController.getAll();
    if (err) {
      enqueueSnackbar(`${t("products.error")}`, { variant: "error" });
      setIsLoading(false);
      return;
    }

    const receivedCategories = res?.data || [];

    useCategoryStore.getState().setCategories(receivedCategories);
    setIsLoading(false);
  }, []);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);

    const [res, err] = await ProductController.getAll({
      page: dataTableOptions.pageIndex,
      size: dataTableOptions.pageSize,
      name: encodeURI(debouncedSearchString),
    });
    if (err) {
      enqueueSnackbar(`${t("products.error")}`, { variant: "error" });
      setIsLoading(false);
      return;
    }

    dataTableOptions.setTotalRows(res?.data.totalElements || 0);
    setProducts(res?.data.content || []);
    setIsLoading(false);
  }, [dataTableOptions.pageIndex, dataTableOptions.pageSize, debouncedSearchString]);

  const handleCreate = () => {
    setIsCreateProductModalOpen(true);
  };

  const handleExportProduct = async () => {
    setIsLoading(true);

    const [res, err] = await ProductController.export();
    console.log({ res, err });
    if (err) {
      enqueueSnackbar(`${t("products.error")}`, { variant: "error" });
      setIsLoading(false);
      return;
    }

    downloadFile(res?.data, `productsExportedAt${new Date().toLocaleString()}`);
    setIsLoading(false);
  };

  const handleEdit = (currentProduct: Product) => {
    setClickedProduct(currentProduct);
    setIsUpdateProductModalOpen(true);
  };

  const handleDelete = (currentProduct: Product) => {
    setClickedProduct(currentProduct);
    setIsDeleteProductModalOpen(true);
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
        <Typography component="h1" variant="h4" marginBottom="2rem" marginTop="1rem">
          {t("products.products")}
        </Typography>

        <Toolbar
          createButtonText={t("products.cProduct")}
          exportButtonText={t("products.exportProduct")}
          onCreate={handleCreate}
          onExport={handleExportProduct}
          searchLabel={t("products.searchName")}
          searchValue={dataTableOptions.searchString}
          setSearchValue={dataTableOptions.setSearchString}
          withCreate
          withExport
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
          totalRows={dataTableOptions.totalRows}
        />

        <Copyright marginTop="2rem" />
      </Container>

      <Loading isOpen={isLoading} />

      <CreateProductModal
        isOpen={isCreateProductModalOpen}
        onClose={() => setIsCreateProductModalOpen(false)}
        onCreateProduct={fetchProducts}
      />
      <UpdateProductModal
        data={clickedProduct}
        isOpen={isUpdateProductModalOpen}
        onClose={() => setIsUpdateProductModalOpen(false)}
        onUpdateProduct={fetchProducts}
      />
      <DeleteProductDialog
        data={clickedProduct}
        isOpen={isDeleteProductModalOpen}
        onClose={() => setIsDeleteProductModalOpen(false)}
        onDeleteProduct={fetchProducts}
      />
    </>
  );
};

export default ProductsPage;
