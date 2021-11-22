import { useSnackbar } from "notistack";
import { useState } from "react";

import { MyModal } from "#root/components/MyModal";
import { useTypeSafeTranslation } from "#root/lib/hooks/useTypeSafeTranslation";

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
  const { t } = useTypeSafeTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (payload: UpdateProductFormPayload) => {
    if (!data) return;

    setIsLoading(true);
    const [res, err] = await ProductController.updateData(data.idProduct, {
      productCategory: { code: payload.productCategory },
      name: payload.name,
      code: payload.code,
      description: payload.description,
      quantity: payload.quantity,
      unitPrice: payload.unitPrice,
    });

    if (err || !res) {
      setIsLoading(false);
      enqueueSnackbar(`${t("common.error")}`, { variant: "error" });
      return;
    }
    setIsLoading(false);
    enqueueSnackbar(`${t("common.updatedSuccess")}`, { variant: "success" });
    onUpdateProduct?.();
    onClose();
  };

  if (!data) return <div />;

  return (
    <MyModal
      isOpen={isOpen}
      onClose={onClose}
      title={t("pages.product.updateProduct")}
      willCloseOnEsc={false}
    >
      <UpdateProductForm data={data} onSubmit={handleSubmit} isLoading={isLoading} />
    </MyModal>
  );
};

export default UpdateProductModal;
