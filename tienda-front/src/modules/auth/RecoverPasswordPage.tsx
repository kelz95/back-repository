/* eslint-disable react-hooks/exhaustive-deps */
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Container, Paper, Typography, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

import PineappleIcon from "#root/assets/pina_sola.png";
import Copyright from "#root/components/Copyright";
import LanguageSwitcher from "#root/components/LanguageSwitcher";
import PasswordInput from "#root/components/PasswordInput";
import TextInput from "#root/components/TextInput";
import { namespaces } from "#root/translations/i18n.constants";

import AuthController from "./AuthController";

type RecoverPasswordPayload = {
  username: string;
  password: string;
};

const RecoverPasswordPage = () => {
  const { t } = useTranslation(namespaces.translation);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const code = params.code as string;
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<RecoverPasswordPayload>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!code) navigate("/login");
  }, [code]);

  const onSubmit = async (data: RecoverPasswordPayload) => {
    if (!code) {
      enqueueSnackbar(t("auth.missingCode"), { variant: "error" });
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
              {t("pages.recover.button")}
            </LoadingButton>
          </Box>
        </Paper>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
};

export default RecoverPasswordPage;
