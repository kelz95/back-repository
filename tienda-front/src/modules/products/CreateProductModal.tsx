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
  const { t } = useTranslation(namespaces.pages.cProductModal);
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
        quantity: payload.quantity,
        unitPrice: payload.unitPrice,
      })
    );
    formData.append("picture", payload.productImage);

    const [res, err] = await ProductController.create(formData);
    console.log({ res, err });
    if (err || !res) {
      enqueueSnackbar(`${t("error")}`, { variant: "error" });
      return;
    }
    enqueueSnackbar(`${t("success")}`, { variant: "success" });
    onCreateProduct?.();
    onClose();
  };

  return (
    <MyModal isOpen={isOpen} onClose={onClose} title={t("title")} willCloseOnEsc={false}>
      <CreateProductForm onSubmit={handleSubmit} />
    </MyModal>
  );
};

export default CreateProductModal;
