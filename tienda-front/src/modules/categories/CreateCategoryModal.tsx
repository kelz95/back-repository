import { useSnackbar } from "notistack";

import { MyModal } from "#root/components/MyModal";

import CreateCategoryForm, { CreateCategoryFormPayload } from "./CreateCategoryForm";
import CategoryController from "./CategoryController";

type CreateCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateCategory?: () => void;
};

const CreateCategoryModal = ({ isOpen, onClose, onCreateCategory }: CreateCategoryModalProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (payload: CreateCategoryFormPayload) => {
    const [res, err] = await CategoryController.create({
      code: payload.code,
      description: payload.description,
    });
    if (err || !res) {
      enqueueSnackbar("Ocurrió un problema", { variant: "error" });
      return;
    }
    enqueueSnackbar("Categoría creada exitosamente", { variant: "success" });
    onCreateCategory?.();
    onClose();
  };
  return (
    <MyModal isOpen={isOpen} onClose={onClose} title="Create new category" willCloseOnEsc={false}>
      <CreateCategoryForm onSubmit={handleSubmit} />
    </MyModal>
  );
};

export default CreateCategoryModal;
