import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

import { MyModal } from "#root/components/MyModal";
import { namespaces } from "#root/translations/i18n.constants";

import ProductController from "./ProductController";
import { Product } from "./types";
import UpdateProductForm, { UpdateProductFormPayload } from "./UpdateProductForm";

type UpdateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpdateProduct?: () => void;
  data: Product | null;
};

const UpdateProductModal = ({
  isOpen,
  onClose,
  onUpdateProduct,
  data,
}: UpdateProductModalProps) => {
  const { t } = useTranslation(namespaces.pages.cProductModal);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (payload: UpdateProductFormPayload) => {
    if (!data) return;

    const [res, err] = await ProductController.updateData(data.idProduct, {
      productCategory: { code: payload.productCategory },
      name: payload.name,
      code: payload.code,
      description: payload.description,
      quantity: payload.quantity,
      unitPrice: payload.unitPrice,
    });

    if (err || !res) {
      enqueueSnackbar(`${t("error")}`, { variant: "error" });
      return;
    }
    enqueueSnackbar(`${t("success")}`, { variant: "success" });
    onUpdateProduct?.();
    onClose();
  };

  if (!data) return <div />;

  return (
    <MyModal isOpen={isOpen} onClose={onClose} title={t("title")} willCloseOnEsc={false}>
      <UpdateProductForm data={data} onSubmit={handleSubmit} />
    </MyModal>
  );
};

export default UpdateProductModal;
