import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

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
};

const UpdateUserForm = ({ data, onSubmit }: UpdateUserFormProps) => {
  const { t } = useTranslation(namespaces.pages.cUserForm);
  const { control, handleSubmit } = useForm<UpdateUserFormPayload>();

  const roleOptions = [
    { label: "Admin", value: "ROLE_ADMIN" },
    { label: "User", value: "ROLE_VIEWER" },
  ];

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <Controller
        control={control}
        defaultValue={data.username}
        name="username"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField autoFocus fullWidth label="Username" margin="normal" required {...field} />
        )}
      />
      <Controller
        control={control}
        defaultValue=""
        // defaultValue={data.password}
        name="password"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            required
            type="password"
            helperText="Debe crear la contraseña nuevamente"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        defaultValue={data.email}
        name="email"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField fullWidth label="Email" margin="normal" required {...field} />
        )}
      />
      <Controller
        control={control}
        defaultValue={data.name}
        name="name"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField fullWidth label="Name" margin="normal" required {...field} />
        )}
      />
      <Controller
        control={control}
        defaultValue={data.lastname}
        name="lastname"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField fullWidth label="Last Name" margin="normal" required {...field} />
        )}
      />

      <Controller
        control={control}
        defaultValue={data.role.code}
        name="role"
        rules={{ required: true }}
        render={({ field }) => (
          <FormControl fullWidth required variant="outlined" sx={{ marginTop: "1rem" }}>
            <InputLabel id="product-category-label">Role</InputLabel>
            <Select label="Role" labelId="product-category-label" {...field}>
              <MenuItem disabled value="">
                <em>Selecciona un rol</em>
              </MenuItem>
              {roleOptions.map(r => (
                <MenuItem key={r.value} value={r.value}>
                  {r.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }}>
        {t("create")}
      </Button>
    </Box>
  );
};

export default UpdateUserForm;
