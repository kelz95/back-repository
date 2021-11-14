import { Box, Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export type CreateCategoryFormPayload = {
  code: string;
  description: string;
};

type CreateCategoryFormProps = {
  onSubmit: (payload: CreateCategoryFormPayload) => void;
};

const CreateCategoryForm = ({ onSubmit }: CreateCategoryFormProps) => {
  const { control, handleSubmit } = useForm<CreateCategoryFormPayload>();
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <Controller
        control={control}
        defaultValue=""
        name="code"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField autoFocus fullWidth label="Code" margin="normal" required {...field} />
        )}
      />
      <Controller
        control={control}
        defaultValue=""
        name="description"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField fullWidth label="Description" margin="normal" required {...field} />
        )}
      />

      <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }}>
        Create
      </Button>
    </Box>
  );
};

export default CreateCategoryForm;
