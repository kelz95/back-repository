import { TextField, TextFieldProps } from "@mui/material";
import { HTMLInputTypeAttribute, ReactNode } from "react";
import {
  Control,
  Controller,
  FieldError,
  Path,
  PathValue,
  UnpackNestedValue,
} from "react-hook-form";

type TextInputProps<T> = {
  control: Control<T>;
  name: Path<T>;

  defaultValue?: UnpackNestedValue<PathValue<T, Path<T>>>;
  error?: FieldError;
  helperText?: ReactNode;

  isRequired?: boolean;
  isDisabled?: boolean;
  label?: string;
  type?: HTMLInputTypeAttribute;
} & Omit<TextFieldProps, "helperText" | "type" | "label" | "error">;

const TextInput = <T,>({
  control,
  defaultValue,
  error,
  helperText,
  name,
  isRequired,
  isDisabled,
  label,
  type = "text",
  ...textFieldProps
}: TextInputProps<T>) => {
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={{ required: isRequired }}
      render={({ field }) => (
        <TextField
          disabled={isDisabled}
          error={Boolean(error)}
          fullWidth
          label={label}
          margin="normal"
          required={isRequired}
          type={type}
          helperText={error ? error.message : helperText}
          {...textFieldProps}
          {...field}
        />
      )}
    />
  );
};

export default TextInput;
