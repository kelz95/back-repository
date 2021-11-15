import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

import { MyModal } from "#root/components/MyModal";
import { namespaces } from "#root/translations/i18n.constants";

import CategoryController from "./CategoryController";
import CreateCategoryForm, { CreateCategoryFormPayload } from "./CreateCategoryForm";

type CreateCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateCategory?: () => void;
};

const CreateCategoryModal = ({ isOpen, onClose, onCreateCategory }: CreateCategoryModalProps) => {
  const { t } = useTranslation(namespaces.pages.cCategoryModal);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (payload: CreateCategoryFormPayload) => {
    const [res, err] = await CategoryController.create({
      code: payload.code,
      description: payload.description,
    });
    if (err || !res) {
      enqueueSnackbar(`${t("error")}`, { variant: "error" });
      return;
    }
    enqueueSnackbar(`${t("success")}`, { variant: "success" });
    onCreateCategory?.();
    onClose();
  };
  return (
    <MyModal isOpen={isOpen} onClose={onClose} title={t("title")} willCloseOnEsc={false}>
      <CreateCategoryForm onSubmit={handleSubmit} />
    </MyModal>
  );
};

export default CreateCategoryModal;
