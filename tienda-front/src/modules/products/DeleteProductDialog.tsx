import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useSnackbar } from "notistack";

import { useTypeSafeTranslation } from "#root/lib/hooks/useTypeSafeTranslation";

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
  const { t } = useTypeSafeTranslation();

  const handleSubmit = async (id: number) => {
    if (!data) return;
    const [res, err] = await ProductController.deleteOne(id);
    if (err || !res) {
      enqueueSnackbar(`${t("common.error")}`, { variant: "error" });
      return;
    }
    enqueueSnackbar(`${t("common.deletedSuccess")}`, { variant: "success" });
    onDeleteProduct?.();
    onClose();
  };

  if (!data) return <div />;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">{`${t("common.initMessageDelete")} "${data.code}" ${t(
        "common.finishMessageDelete"
      )}`}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t("common.messageDelete")}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("common.cancel")}</Button>
        <Button color="error" onClick={() => handleSubmit(data.idProduct)} autoFocus>
          {t("common.delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProductDialog;
