import { MyModal } from "#root/components/MyModal";

import CreateUserForm, { CreateUserFormPayload } from "./CreateUserForm";

type CreateUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateUserModal = ({ isOpen, onClose }: CreateUserModalProps) => {
  const handleSubmit = (payload: CreateUserFormPayload) => {
    console.log(payload);
  };
  return (
    <MyModal isOpen={isOpen} onClose={onClose} title="Create new user" willCloseOnEsc={false}>
      <CreateUserForm onSubmit={handleSubmit} />
    </MyModal>
  );
};

export default CreateUserModal;
