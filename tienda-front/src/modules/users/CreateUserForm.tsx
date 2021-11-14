import { Box, Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

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
  const { control, handleSubmit } = useForm<CreateUserFormPayload>();
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <Controller
        control={control}
        defaultValue=""
        name="name"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField autoFocus fullWidth label="Name" margin="normal" required {...field} />
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
      <Controller
        control={control}
        defaultValue={1}
        name="quantity"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField fullWidth label="Quantity" margin="normal" required type="number" {...field} />
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
            label="Unit Price (S/.)"
            margin="normal"
            required
            type="number"
            {...field}
          />
        )}
      />

      <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }}>
        Create
      </Button>
    </Box>
  );
};

export default CreateUserForm;
