import { FormControl, FormControlProps, FormHelperText, Typography } from "@mui/material";
import { ReactNode } from "react";
import {
  Control,
  Controller,
  FieldError,
  Path,
  PathValue,
  UnpackNestedValue,
} from "react-hook-form";

type FileInputProps<T> = {
  control: Control<T>;
  name: Path<T>;
  id: string;

  defaultValue?: UnpackNestedValue<PathValue<T, Path<T>>>;
  error?: FieldError;
  helperText?: ReactNode;

  isRequired?: boolean;
  isDisabled?: boolean;
  label?: string;
} & Omit<FormControlProps, "helperText" | "type" | "label" | "error">;

const FileInput = <T,>({
  control,
  defaultValue,
  id,
  error,
  helperText,
  name,
  isRequired,
  isDisabled,
  label,
  ...formControlProps
}: FileInputProps<T>) => {
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={{ required: isRequired }}
      render={({ field }) => (
        <FormControl
          error={Boolean(error)}
          fullWidth
          required={isRequired}
          disabled={isDisabled}
          sx={{ marginTop: "1rem" }}
          variant="outlined"
          {...formControlProps}
        >
          {label && (
            <Typography component="label" htmlFor={id} variant="subtitle1" marginTop="1rem">
              {label}
              {isRequired && " *"}
            </Typography>
          )}

          <input
            id={id}
            type="file"
            accept="image/*"
            onChange={evt => field.onChange(evt.target.files?.[0])}
          />
          <FormHelperText>{error ? error.message : helperText}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FileInput;
