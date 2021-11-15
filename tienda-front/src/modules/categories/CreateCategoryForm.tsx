import { Box, Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { namespaces } from "#root/translations/i18n.constants";

export type CreateCategoryFormPayload = {
  code: string;
  description: string;
};

type CreateCategoryFormProps = {
  onSubmit: (payload: CreateCategoryFormPayload) => void;
};

const CreateCategoryForm = ({ onSubmit }: CreateCategoryFormProps) => {
  const { t } = useTranslation(namespaces.pages.cCategoryForm);

  const { control, handleSubmit } = useForm<CreateCategoryFormPayload>();
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <Controller
        control={control}
        defaultValue=""
        name="code"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField autoFocus fullWidth label={t("code")} margin="normal" required {...field} />
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

      <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }}>
        {t("create")}
      </Button>
    </Box>
  );
};

export default CreateCategoryForm;
