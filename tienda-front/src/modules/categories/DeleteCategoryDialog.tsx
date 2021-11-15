import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useSnackbar } from "notistack";

import CategoryController from "./CategoryController";
import { Category } from "./types";

import { useTranslation } from "react-i18next";
import { namespaces } from "#root/translations/i18n.constants";

type DeleteCategoryDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onDeleteCategory?: () => void;
  data: Category | null;
};

const DeleteCategoryDialog = ({
  isOpen,
  onClose,
  onDeleteCategory,
  data,
}: DeleteCategoryDialogProps) => {
  const { t } = useTranslation(namespaces.pages.dCategoryDialog);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (id: number) => {
    if (!data) return;
    const [res, err] = await CategoryController.deleteOne(id);
    if (err || !res) {
      enqueueSnackbar(`${t("error")}`, { variant: "error" });
      return;
    }
    enqueueSnackbar(`${t("success")}`, { variant: "success" });
    onDeleteCategory?.();
    onClose();
  };

  if (!data) return <div />;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">{`${t("tDelete")} "${data.code}" ${t(
        "tCategory"
      )}`}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t("message")}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("bCancel")}</Button>
        <Button onClick={() => handleSubmit(data.idProductCategory)} autoFocus>
          {t("bDelete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCategoryDialog;
