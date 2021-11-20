import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

import { namespaces } from "#root/translations/i18n.constants";

import ProductController from "./ProductController";
import { Product } from "./types";

type DeleteProductDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onDeleteProduct?: () => void;
  data: Product | null;
};

const DeleteProductDialog = ({
  isOpen,
  onClose,
  onDeleteProduct,
  data,
}: DeleteProductDialogProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation(namespaces.translation);

  const handleSubmit = async (id: number) => {
    if (!data) return;
    const [res, err] = await ProductController.deleteOne(id);
    if (err || !res) {
      enqueueSnackbar(`${t("common.error")}`, { variant: "error" });
      return;
    }
    enqueueSnackbar(`${t("common.succesDelete")}`, { variant: "success" });
    onDeleteProduct?.();
    onClose();
  };

  if (!data) return <div />;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">{`${t("deleteProductDialog.tDeleteProduct")} "${
        data.code
      }" ${t("deleteProductDialog.tProduct")}`}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t("common.messageDelete")}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("common.bCancel")}</Button>
        <Button color="error" onClick={() => handleSubmit(data.idProduct)} autoFocus>
          {t("common.bDelete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProductDialog;
