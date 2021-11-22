import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import YupPassword from "yup-password";

import PasswordInput from "#root/components/PasswordInput";
import SelectInput from "#root/components/SelectInput";
import TextInput from "#root/components/TextInput";
import { useTypeSafeTranslation } from "#root/lib/hooks/useTypeSafeTranslation";

import { User } from "./types";

YupPassword(yup); // extend yup

export type UpdateUserFormPayload = {
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
    .max(30, "Username must be at most 30 characters")
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

type UpdateUserFormProps = {
  data: User;
  onSubmit: (payload: UpdateUserFormPayload) => void;
  isLoading?: boolean;
};

const UpdateUserForm = ({ data, onSubmit, isLoading }: UpdateUserFormProps) => {
  const { t } = useTypeSafeTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateUserFormPayload>({ resolver: yupResolver(schema) });

  const roleOptions = [
    { label: `${t("pages.user.admin")}`, value: "ROLE_ADMIN" },
    { label: `${t("pages.user.regularUser")}`, value: "ROLE_VIEWER" },
  ];

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <TextInput
        autoFocus
        control={control}
        defaultValue={data.username}
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
        helperText="Debe crear la contraseña nuevamente"
        isRequired
        name="password"
        id="password-input-update"
        label={t("common.password")}
      />

      <TextInput
        control={control}
        defaultValue={data.email}
        error={errors.email}
        isDisabled={isLoading}
        isRequired
        name="email"
        label={t("common.email")}
      />

      <TextInput
        control={control}
        defaultValue={data.name}
        error={errors.name}
        isDisabled={isLoading}
        isRequired
        name="name"
        label={t("common.name")}
      />

      <TextInput
        control={control}
        defaultValue={data.lastname}
        error={errors.lastname}
        isDisabled={isLoading}
        isRequired
        name="lastname"
        label={t("common.lastname")}
      />

      <SelectInput
        control={control}
        defaultValue={data.role.code}
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
        {t("common.update")}
      </LoadingButton>
    </Box>
  );
};

export default UpdateUserForm;
