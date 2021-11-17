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

import { User } from "./types";
import UserController from "./UserController";

type DeleteUserDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onDeleteUser?: () => void;
  data: User | null;
};

const DeleteUserDialog = ({ isOpen, onClose, onDeleteUser, data }: DeleteUserDialogProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation(namespaces.pages.dCategoryDialog);

  const handleSubmit = async (id: number) => {
    if (!data) return;
    const [res, err] = await UserController.deleteOne(id);
    if (err || !res) {
      enqueueSnackbar(`${t("error")}`, { variant: "error" });
      return;
    }
    enqueueSnackbar(`${t("success")}`, { variant: "success" });
    onDeleteUser?.();
    onClose();
  };

  if (!data) return <div />;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">{`${t("tDeleteProduct")} "${data.username}" ${t(
        "tProduct"
      )}`}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t("message")}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("bCancel")}</Button>
        <Button color="error" onClick={() => handleSubmit(data.idUser)} autoFocus>
          {t("bDelete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserDialog;
