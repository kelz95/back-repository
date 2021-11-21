import { useSnackbar } from "notistack";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { MyModal } from "#root/components/MyModal";
import { namespaces } from "#root/translations/i18n.constants";

import CreateUserForm, { CreateUserFormPayload } from "./CreateUserForm";
import { RoleCode } from "./types";
import UserController from "./UserController";

type CreateUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateUser?: () => void;
};

const CreateUserModal = ({ isOpen, onClose, onCreateUser }: CreateUserModalProps) => {
  const { t } = useTranslation(namespaces.pages.cUserModal);
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (payload: CreateUserFormPayload) => {
    setIsLoading(true);
    const [res, err] = await UserController.create({
      role: { code: payload.role as RoleCode },
      username: payload.username,
      password: payload.password,
      email: payload.email,
      name: payload.name,
      lastname: payload.lastname,
    });
    if (err || !res) {
      setIsLoading(false);
      enqueueSnackbar(err?.response?.data.mensaje || t("error"), { variant: "error" });
      return;
    }
    setIsLoading(false);
    enqueueSnackbar(`${t("success")}`, { variant: "success" });
    onCreateUser?.();
    onClose();
  };

  return (
    <MyModal isOpen={isOpen} onClose={onClose} title={t("title")} willCloseOnEsc={false}>
      <CreateUserForm isLoading={isLoading} onSubmit={handleSubmit} />
    </MyModal>
  );
};

export default CreateUserModal;
