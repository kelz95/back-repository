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

import { useTypeSafeTranslation } from "#root/lib/hooks/useTypeSafeTranslation";

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
  const { t } = useTypeSafeTranslation();

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (id: number) => {
    if (!data) return;
    const [res, err] = await CategoryController.deleteOne(id);
    if (err || !res) {
      enqueueSnackbar(`${t("common.error")}`, { variant: "error" });
      return;
    }
    enqueueSnackbar(`${t("common.deletedSuccess")}`, { variant: "success" });
    onDeleteCategory?.();
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
        <Button onClick={() => handleSubmit(data.idProductCategory)} autoFocus>
          {t("common.delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCategoryDialog;
