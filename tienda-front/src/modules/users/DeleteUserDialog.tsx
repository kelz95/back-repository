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
  const { t } = useTypeSafeTranslation();

  const handleSubmit = async (id: number) => {
    if (!data) return;
    const [res, err] = await UserController.deleteOne(id);
    if (err || !res) {
      enqueueSnackbar(`${t("common.error")}`, { variant: "error" });
      return;
    }
    enqueueSnackbar(`${t("common.deletedSuccess")}`, { variant: "success" });
    onDeleteUser?.();
    onClose();
  };

  if (!data) return <div />;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">{`${t("common.initMessageDelete")} "${
        data.username
      }" ${t("common.finishMessageDelete")}`}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t("common.messageDelete")}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("common.cancel")}</Button>
        <Button color="error" onClick={() => handleSubmit(data.idUser)} autoFocus>
          {t("common.delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserDialog;
