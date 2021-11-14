import { Box, Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { namespaces } from "#root/translations/i18n.constants";

export type CreateUserFormPayload = {
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;

  productCategory: string;
};

type CreateUserFormProps = {
  onSubmit: (payload: CreateUserFormPayload) => void;
};

const CreateUserForm = ({ onSubmit }: CreateUserFormProps) => {
  const { t } = useTranslation(namespaces.pages.cUserForm);

  const { control, handleSubmit } = useForm<CreateUserFormPayload>();
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <Controller
        control={control}
        defaultValue=""
        name="name"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField autoFocus fullWidth label={t("name")} margin="normal" required {...field} />
        )}
      />
      <Controller
        control={control}
        defaultValue=""
        name="description"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField fullWidth label={t("description")} margin="normal" required {...field} />
        )}
      />
      <Controller
        control={control}
        defaultValue={1}
        name="quantity"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            fullWidth
            label={t("quantity")}
            margin="normal"
            required
            type="number"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        defaultValue={1.0}
        name="unitPrice"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            fullWidth
            label={t("uPrice")}
            margin="normal"
            required
            type="number"
            {...field}
          />
        )}
      />

      <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }}>
        {t("create")}
      </Button>
    </Box>
  );
};

export default CreateUserForm;
