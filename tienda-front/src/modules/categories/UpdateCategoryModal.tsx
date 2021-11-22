import { useSnackbar } from "notistack";

import { MyModal } from "#root/components/MyModal";

import CategoryController from "./CategoryController";
import UpdateCategoryForm, { UpdateCategoryFormPayload } from "./UpdateCategoryForm";
import { Category } from "./types";

import { useTypeSafeTranslation } from "#root/lib/hooks/useTypeSafeTranslation";

type UpdateCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpdateCategory?: () => void;
  data: Category | null;
};

const UpdateCategoryModal = ({
  isOpen,
  onClose,
  onUpdateCategory,
  data,
}: UpdateCategoryModalProps) => {
  const { t } = useTypeSafeTranslation();

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (payload: UpdateCategoryFormPayload) => {
    if (!data) return;
    const [res, err] = await CategoryController.update(data.idProductCategory, {
      code: payload.code,
      description: payload.description,
    });
    if (err || !res) {
      enqueueSnackbar(`${t("common.error")}`, { variant: "error" });
      return;
    }
    enqueueSnackbar(`${t("common.updatedSuccess")}`, { variant: "success" });
    onUpdateCategory?.();
    onClose();
  };

  if (!data) return <div />;

  return (
    <MyModal
      isOpen={isOpen}
      onClose={onClose}
      title={t("pages.category.updateCategory")}
      willCloseOnEsc={false}
    >
      <UpdateCategoryForm data={data} onSubmit={handleSubmit} />
    </MyModal>
  );
};

export default UpdateCategoryModal;
