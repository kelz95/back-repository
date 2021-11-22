/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Container, Paper, Typography, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import YupPassword from "yup-password";

import PineappleIcon from "#root/assets/pina_sola.png";
import Copyright from "#root/components/Copyright";
import LanguageSwitcher from "#root/components/LanguageSwitcher";
import PasswordInput from "#root/components/PasswordInput";
import TextInput from "#root/components/TextInput";
import { useTypeSafeTranslation } from "#root/lib/hooks/useTypeSafeTranslation";

import AuthController from "./AuthController";

YupPassword(yup); // extend yup

type RecoverPasswordPayload = {
  username: string;
  password: string;
};

const schema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters")
    .max(30, "Username must be at most 30 characters")
    .required("Please enter a username"),
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be at least 30 characters")
    .minUppercase(1, "Password must contain at least 1 uppercase")
    .minNumbers(2, "Password must contain at least 2 number")
    .minSymbols(1, "Password must contain at least 1 special character"),
});

const RecoverPasswordPage = () => {
  const { t } = useTypeSafeTranslation();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const code = params.code as string;
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<RecoverPasswordPayload>({ resolver: yupResolver(schema) });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!code) navigate("/login");
  }, [code]);

  const onSubmit = async (data: RecoverPasswordPayload) => {
    if (!code) {
      enqueueSnackbar(t("common.error"), { variant: "error" });
    }
    setIsLoading(true);
    const apiResult = await AuthController.restorePassword(code, {
      username: data.username.trim(),
      password: data.password.trim(),
    });

    if (apiResult.error || !apiResult.data) {
      enqueueSnackbar(apiResult.error, { variant: "error" });
      setIsLoading(false);
      return;
    }
    enqueueSnackbar(`${t("pages.recover.successMessage")}`, { variant: "success" });
    setIsLoading(false);

    navigate("/login", { replace: true });
  };

  return (
    <>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        paddingRight="2rem"
        paddingTop="2rem"
      >
        <div />
        <LanguageSwitcher logoColor="inherit" />
      </Stack>
      <Container component="main" maxWidth="xs" sx={{ paddingTop: 8 }}>
        <Paper
          sx={{
            paddingX: 8,
            paddingY: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ margin: 1, bgcolor: "secondary.main", width: 60, height: 60 }}
            src={PineappleIcon}
          />

          <Typography component="h1" variant="h5">
            {t("pages.recover.title")}
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextInput
              autoFocus
              control={control}
              defaultValue=""
              error={errors.username}
              isDisabled={isLoading}
              isRequired
              name="username"
              helperText={t("pages.recover.usernameHelperText")}
              label={t("common.username")}
            />

            <PasswordInput
              control={control}
              defaultValue=""
              error={errors.password}
              isDisabled={isLoading}
              isRequired
              name="password"
              helperText={t("pages.recover.passwordHelperText")}
              id="password-input"
              label={t("common.password")}
            />

            <LoadingButton
              fullWidth
              loading={isLoading}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t("common.send")}
            </LoadingButton>
          </Box>
        </Paper>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
};

export default RecoverPasswordPage;
