import {
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { ReactNode } from "react";
import {
  Control,
  Controller,
  FieldError,
  Path,
  PathValue,
  UnpackNestedValue,
} from "react-hook-form";

type SelectOption = {
  label: string;
  value: string;
};

type SelectInputProps<T> = {
  control: Control<T>;
  name: Path<T>;
  id: string;
  options: SelectOption[];

  defaultValue?: UnpackNestedValue<PathValue<T, Path<T>>>;
  error?: FieldError;
  helperText?: ReactNode;

  isRequired?: boolean;
  isDisabled?: boolean;
  label?: string;
  placeholder?: string;
} & Omit<FormControlProps, "helperText" | "type" | "label" | "error">;

const SelectInput = <T,>({
  control,
  name,
  id,
  options,
  defaultValue,
  error,
  helperText,
  isRequired,
  isDisabled,
  label,
  placeholder,
  ...formControlProps
}: SelectInputProps<T>) => {
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
          <InputLabel id={id}>{label}</InputLabel>
          <Select label={label} labelId={id} {...field}>
            {placeholder && (
              <MenuItem disabled value="">
                <em>{placeholder}</em>
              </MenuItem>
            )}
            {options.map(o => (
              <MenuItem key={o.value} value={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error ? error.message : helperText}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default SelectInput;
