import { useSnackbar } from "notistack";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { MyModal } from "#root/components/MyModal";
import { namespaces } from "#root/translations/i18n.constants";

import { RoleCode, User } from "./types";
import UserController from "./UserController";
import UpdateUserForm, { UpdateUserFormPayload } from "./UpdateUserForm";

type UpdateUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpdateUser?: () => void;
  data: User | null;
};

const UpdateUserModal = ({ isOpen, onClose, onUpdateUser, data }: UpdateUserModalProps) => {
  const { t } = useTranslation(namespaces.pages.cUserModal);
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (payload: UpdateUserFormPayload) => {
    if (!data) return;

    setIsLoading(true);
    const [res, err] = await UserController.update(data.idUser, {
      role: {
        code: payload.role as RoleCode,
      },
      username: payload.username.trim(),
      password: payload.password.trim(),
      email: payload.email.trim(),
      name: payload.name.trim(),
      lastname: payload.lastname.trim(),
    });
    if (err || !res) {
      setIsLoading(false);
      enqueueSnackbar(err?.response?.data?.mensaje || t("error"), { variant: "error" });
      return;
    }
    setIsLoading(false);
    enqueueSnackbar(`${t("success")}`, { variant: "success" });
    onUpdateUser?.();
    onClose();
  };

  if (!data) return <div />;

  return (
    <MyModal isOpen={isOpen} onClose={onClose} title="Actualizar usuario" willCloseOnEsc={false}>
      <UpdateUserForm data={data} isLoading={isLoading} onSubmit={handleSubmit} />
    </MyModal>
  );
};

export default UpdateUserModal;
