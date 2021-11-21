import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import YupPassword from "yup-password";

import PasswordInput from "#root/components/PasswordInput";
import SelectInput from "#root/components/SelectInput";
import TextInput from "#root/components/TextInput";
import { namespaces } from "#root/translations/i18n.constants";

YupPassword(yup); // extend yup

export type CreateUserFormPayload = {
  username: string;
  password: string;
  email: string;
  name: string;
  lastname: string;

  role: string;
};

const schema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters")
    .required("Please enter a username"),
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be at least 30 characters")
    .minUppercase(1, "Password must contain at least 1 uppercase")
    .minNumbers(2, "Password must contain at least 2 number")
    .minSymbols(1, "Password must contain at least 1 special character"),
  name: yup.string().required("Please enter a name"),
  lastname: yup.string().required("Please enter a lastname"),

  role: yup.string().required("Please enter the role"),
});

type CreateUserFormProps = {
  onSubmit: (payload: CreateUserFormPayload) => void;
  isLoading?: boolean;
};

const CreateUserForm = ({ onSubmit, isLoading }: CreateUserFormProps) => {
  const { t } = useTranslation(namespaces.translation);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserFormPayload>({ resolver: yupResolver(schema) });

  const roleOptions = [
    { label: `${t("pages.user.admin")}`, value: "ROLE_ADMIN" },
    { label: `${t("pages.user.regularUser")}`, value: "ROLE_VIEWER" },
  ];

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <TextInput
        autoFocus
        control={control}
        defaultValue=""
        error={errors.username}
        isDisabled={isLoading}
        isRequired
        name="username"
        label={t("common.username")}
      />

      <PasswordInput
        control={control}
        defaultValue=""
        error={errors.password}
        isDisabled={isLoading}
        isRequired
        name="password"
        id="password-input"
        label={t("common.password")}
      />

      <TextInput
        control={control}
        defaultValue=""
        error={errors.email}
        isDisabled={isLoading}
        isRequired
        name="email"
        label={t("common.email")}
      />

      <TextInput
        control={control}
        defaultValue=""
        error={errors.name}
        isDisabled={isLoading}
        isRequired
        name="name"
        label={t("common.name")}
      />

      <TextInput
        control={control}
        defaultValue=""
        error={errors.lastname}
        isDisabled={isLoading}
        isRequired
        name="lastname"
        label={t("common.lastname")}
      />

      <SelectInput
        control={control}
        defaultValue=""
        error={errors.role}
        options={roleOptions}
        isDisabled={isLoading}
        isRequired
        id="product-category-label"
        name="role"
        label={t("pages.user.role")}
        placeholder={t("pages.user.selectRole")}
      />

      <LoadingButton fullWidth loading={isLoading} type="submit" variant="contained" sx={{ mt: 3 }}>
        {t("common.create")}
      </LoadingButton>
    </Box>
  );
};

export default CreateUserForm;
