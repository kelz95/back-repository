import { MyModal } from "#root/components/MyModal";

import CreateProductForm, { CreateProductFormPayload } from "./CreateProductForm";

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateProductModal = ({ isOpen, onClose }: CreateProductModalProps) => {
  const handleSubmit = (payload: CreateProductFormPayload) => {
    console.log(payload);
  };
  return (
    <MyModal isOpen={isOpen} onClose={onClose} title="Create new product" willCloseOnEsc={false}>
      <CreateProductForm onSubmit={handleSubmit} />
    </MyModal>
  );
};

export default CreateProductModal;
