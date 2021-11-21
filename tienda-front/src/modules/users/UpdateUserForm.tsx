import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import SelectInput from "#root/components/SelectInput";
import TextInput from "#root/components/TextInput";
import { namespaces } from "#root/translations/i18n.constants";

import { User } from "./types";

export type UpdateUserFormPayload = {
  username: string;
  password: string;
  email: string;
  name: string;
  lastname: string;

  role: string;
};

type UpdateUserFormProps = {
  data: User;
  onSubmit: (payload: UpdateUserFormPayload) => void;
  isLoading?: boolean;
};

const UpdateUserForm = ({ data, onSubmit, isLoading }: UpdateUserFormProps) => {
  const { t } = useTranslation(namespaces.pages.cUserForm);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateUserFormPayload>();

  const roleOptions = [
    { label: "Admin", value: "ROLE_ADMIN" },
    { label: "User", value: "ROLE_VIEWER" },
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
        label="Username"
      />

      <TextInput
        control={control}
        defaultValue=""
        error={errors.password}
        isDisabled={isLoading}
        helperText="Debe crear la contraseña nuevamente"
        isRequired
        name="password"
        label="Password"
        type="password"
      />

      <TextInput
        control={control}
        defaultValue={data.email}
        error={errors.email}
        isDisabled={isLoading}
        isRequired
        name="email"
        label="Email"
      />

      <TextInput
        control={control}
        defaultValue={data.name}
        error={errors.name}
        isDisabled={isLoading}
        isRequired
        name="name"
        label="Name"
      />

      <TextInput
        control={control}
        defaultValue={data.lastname}
        error={errors.lastname}
        isDisabled={isLoading}
        isRequired
        name="lastname"
        label="Last Name"
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
        label="Role"
        placeholder="Selecciona un rol"
      />

      <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }}>
        {t("create")}
      </Button>
    </Box>
  );
};

export default UpdateUserForm;
