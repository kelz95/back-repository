import { MyModal } from "#root/components/MyModal";

import CreateUserForm, { CreateUserFormPayload } from "./CreateUserForm";

import { useTranslation } from "react-i18next";
import { namespaces } from "#root/translations/i18n.constants";

type CreateUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateUserModal = ({ isOpen, onClose }: CreateUserModalProps) => {
  const { t } = useTranslation(namespaces.pages.cUserModal);

  const handleSubmit = (payload: CreateUserFormPayload) => {
    console.log(payload);
  };
  return (
    <MyModal isOpen={isOpen} onClose={onClose} title={t("title")} willCloseOnEsc={false}>
      <CreateUserForm onSubmit={handleSubmit} />
    </MyModal>
  );
};

export default CreateUserModal;
