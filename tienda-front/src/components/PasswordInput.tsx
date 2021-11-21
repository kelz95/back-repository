import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormControlProps,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { ReactNode, useState } from "react";
import {
  Control,
  Controller,
  FieldError,
  Path,
  PathValue,
  UnpackNestedValue,
} from "react-hook-form";

type PasswordInputProps<T> = {
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

const PasswordInput = <T,>({
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
}: PasswordInputProps<T>) => {
  const [isShowingPassword, setIsShowingPassword] = useState(false);
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
          {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
          <OutlinedInput
            id={id}
            type={isShowingPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setIsShowingPassword(old => !old)}
                  onMouseDown={evt => evt.preventDefault()}
                  edge="end"
                >
                  {isShowingPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={label}
            {...field}
          />
          <FormHelperText>{error ? error.message : helperText}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default PasswordInput;
