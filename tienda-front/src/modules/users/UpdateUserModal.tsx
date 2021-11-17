import { useSnackbar } from "notistack";
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

  const handleSubmit = async (payload: UpdateUserFormPayload) => {
    if (!data) return;

    const [res, err] = await UserController.update(data.idUser, {
      role: {
        code: payload.role as RoleCode,
      },
      username: payload.username,
      password: payload.password,
      email: payload.email,
      name: payload.name,
      lastname: payload.lastname,
    });
    if (err || !res) {
      enqueueSnackbar(err?.response?.data?.mensaje || t("error"), { variant: "error" });
      return;
    }
    enqueueSnackbar(`${t("success")}`, { variant: "success" });
    onUpdateUser?.();
    onClose();
  };

  if (!data) return <div />;

  return (
    <MyModal isOpen={isOpen} onClose={onClose} title="Actualizar usuario" willCloseOnEsc={false}>
      <UpdateUserForm data={data} onSubmit={handleSubmit} />
    </MyModal>
  );
};

export default UpdateUserModal;
