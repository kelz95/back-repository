import { Box, Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { useTypeSafeTranslation } from "#root/lib/hooks/useTypeSafeTranslation";

export type CreateCategoryFormPayload = {
  code: string;
  description: string;
};

type CreateCategoryFormProps = {
  onSubmit: (payload: CreateCategoryFormPayload) => void;
};

const CreateCategoryForm = ({ onSubmit }: CreateCategoryFormProps) => {
  const { t } = useTypeSafeTranslation();

  const { control, handleSubmit } = useForm<CreateCategoryFormPayload>();
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <Controller
        control={control}
        defaultValue=""
        name="code"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            autoFocus
            fullWidth
            label={t("common.code")}
            margin="normal"
            required
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        defaultValue=""
        name="description"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            fullWidth
            label={t("common.description")}
            margin="normal"
            required
            {...field}
          />
        )}
      />

      <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }}>
        {t("pages.category.createCategory")}
      </Button>
    </Box>
  );
};

export default CreateCategoryForm;
