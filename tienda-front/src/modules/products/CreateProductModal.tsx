import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

import { MyModal } from "#root/components/MyModal";
import { namespaces } from "#root/translations/i18n.constants";

import CreateProductForm, { CreateProductFormPayload } from "./CreateProductForm";
import ProductController from "./ProductController";

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateProduct?: () => void;
};

const CreateProductModal = ({ isOpen, onClose, onCreateProduct }: CreateProductModalProps) => {
  const { t } = useTranslation(namespaces.translation);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (payload: CreateProductFormPayload) => {
    const formData = new FormData();
    formData.append(
      "producto",
      JSON.stringify({
        productCategory: { code: payload.productCategory },
        name: payload.name,
        code: payload.code,
        description: payload.description,
        quantity: Number(payload.quantity),
        unitPrice: Number(payload.unitPrice),
      })
    );

    formData.append("picture", payload.productImage || "null");

    const [res, err] = await ProductController.create(formData);
    console.log({ res, err });
    if (err || !res) {
      enqueueSnackbar(`${t("createProductModal.error")}`, { variant: "error" });
      return;
    }
    enqueueSnackbar(`${t("createProductModal.success")}`, { variant: "success" });
    onCreateProduct?.();
    onClose();
  };

  return (
    <MyModal
      isOpen={isOpen}
      onClose={onClose}
      title={t("createProductModal.title")}
      willCloseOnEsc={false}
    >
      <CreateProductForm onSubmit={handleSubmit} />
    </MyModal>
  );
};

export default CreateProductModal;
