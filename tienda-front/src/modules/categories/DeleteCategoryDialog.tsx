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
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (id: number) => {
    if (!data) return;
    const [res, err] = await CategoryController.deleteOne(id);
    if (err || !res) {
      enqueueSnackbar("Ocurrió un problema", { variant: "error" });
      return;
    }
    enqueueSnackbar("Categoría eliminida exitosamente", { variant: "success" });
    onDeleteCategory?.();
    onClose();
  };

  if (!data) return <div />;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">{`Delete "${data.code}" category?`}</DialogTitle>
      <DialogContent>
        <DialogContentText>¡Careful! This action is irreversible.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => handleSubmit(data.idProductCategory)} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCategoryDialog;
