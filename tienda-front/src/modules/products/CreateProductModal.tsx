import { MyModal } from "#root/components/MyModal";

import CreateProductForm, { CreateProductFormPayload } from "./CreateProductForm";

import { useTranslation } from "react-i18next";
import { namespaces } from "#root/translations/i18n.constants";

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateProductModal = ({ isOpen, onClose }: CreateProductModalProps) => {
  const { t } = useTranslation(namespaces.pages.cProductModal);

  const handleSubmit = (payload: CreateProductFormPayload) => {
    console.log(payload);
  };
  return (
    <MyModal isOpen={isOpen} onClose={onClose} title={t("title")} willCloseOnEsc={false}>
      <CreateProductForm onSubmit={handleSubmit} />
    </MyModal>
  );
};

export default CreateProductModal;
