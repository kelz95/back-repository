import { Box, Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { Category } from "./types";

export type UpdateCategoryFormPayload = {
  code: string;
  description: string;
};

type UpdateCategoryFormProps = {
  onSubmit: (payload: UpdateCategoryFormPayload) => void;
  data: Category;
};

const UpdateCategoryForm = ({ data, onSubmit }: UpdateCategoryFormProps) => {
  const { control, handleSubmit } = useForm<UpdateCategoryFormPayload>();
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <Controller
        control={control}
        defaultValue={data?.code}
        name="code"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField autoFocus fullWidth label="Code" margin="normal" required {...field} />
        )}
      />
      <Controller
        control={control}
        defaultValue={data?.description}
        name="description"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField fullWidth label="Description" margin="normal" required {...field} />
        )}
      />

      <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }}>
        Update
      </Button>
    </Box>
  );
};

export default UpdateCategoryForm;
