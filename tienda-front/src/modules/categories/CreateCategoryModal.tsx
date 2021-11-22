import { useSnackbar } from "notistack";

import { MyModal } from "#root/components/MyModal";
import { useTypeSafeTranslation } from "#root/lib/hooks/useTypeSafeTranslation";

import CategoryController from "./CategoryController";
import CreateCategoryForm, { CreateCategoryFormPayload } from "./CreateCategoryForm";

type CreateCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateCategory?: () => void;
};

const CreateCategoryModal = ({ isOpen, onClose, onCreateCategory }: CreateCategoryModalProps) => {
  const { t } = useTypeSafeTranslation();

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (payload: CreateCategoryFormPayload) => {
    const [res, err] = await CategoryController.create({
      code: payload.code,
      description: payload.description,
    });
    if (err || !res) {
      enqueueSnackbar(`${t("common.error")}`, { variant: "error" });
      return;
    }
    enqueueSnackbar(`${t("common.createdSuccess")}`, { variant: "success" });
    onCreateCategory?.();
    onClose();
  };
  return (
    <MyModal
      isOpen={isOpen}
      onClose={onClose}
      title={t("pages.category.createCategory")}
      willCloseOnEsc={false}
    >
      <CreateCategoryForm onSubmit={handleSubmit} />
    </MyModal>
  );
};

export default CreateCategoryModal;
