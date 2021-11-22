/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useTypeSafeTranslation } from "#root/lib/hooks/useTypeSafeTranslation";

import Copyright from "#root/components/Copyright";
import Loading from "#root/components/Loading";
import NavBar from "#root/components/NavBar";
import Toolbar from "#root/components/Toolbar";

import CategoriesTable from "./CategoriesTable";
import CategoryController from "./CategoryController";
import CreateCategoryModal from "./CreateCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
import DeleteCategoryDialog from "./DeleteCategoryDialog";
import { Category } from "./types";
import { useCategoryStore } from "./useCategoryStore";

const CategoriesPage = () => {
  const { t } = useTypeSafeTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false);
  const [isUpdateCategoryModalOpen, setIsUpdateCategoryModalOpen] = useState(false);
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [clickedCategory, setClickedCategory] = useState<Category | null>(null);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    const [res, err] = await CategoryController.getAll();
    if (err) {
      enqueueSnackbar(`${t("common.error")}`, { variant: "error" });
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
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="lg">
        <Typography component="h1" variant="h4" marginBottom="2rem" marginTop="1rem">
          {t("pages.category.list")}
        </Typography>

        <Toolbar
          createButtonText={t("pages.category.createCategory")}
          onCreate={handleCreateCategory}
        />
        <CategoriesTable
          data={categories}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
        />

        <Copyright marginTop="2rem" />
      </Container>

      <Loading isOpen={isLoading} />

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

export default CategoriesPage;
