import { useSnackbar } from "notistack";

import { MyModal } from "#root/components/MyModal";

import CategoryController from "./CategoryController";
import UpdateCategoryForm, { UpdateCategoryFormPayload } from "./UpdateCategoryForm";
import { Category } from "./types";

import { useTranslation } from "react-i18next";
import { namespaces } from "#root/translations/i18n.constants";

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
  const { t } = useTranslation(namespaces.pages.uCategoryModal);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (payload: UpdateCategoryFormPayload) => {
    if (!data) return;
    const [res, err] = await CategoryController.update(data.idProductCategory, {
      code: payload.code,
      description: payload.description,
    });
    if (err || !res) {
      enqueueSnackbar(`${t("error")}`, { variant: "error" });
      return;
    }
    enqueueSnackbar(`${t("success")}`, { variant: "success" });
    onUpdateCategory?.();
    onClose();
  };

  if (!data) return <div />;

  return (
    <MyModal isOpen={isOpen} onClose={onClose} title={t("title")} willCloseOnEsc={false}>
      <UpdateCategoryForm data={data} onSubmit={handleSubmit} />
    </MyModal>
  );
};

export default UpdateCategoryModal;
