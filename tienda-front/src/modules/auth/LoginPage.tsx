/* eslint-disable react-hooks/exhaustive-deps */
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Container, Link, Paper, Typography, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";

import PineappleIcon from "#root/assets/pina_sola.png";
import Copyright from "#root/components/Copyright";
import LanguageSwitcher from "#root/components/LanguageSwitcher";
import PasswordInput from "#root/components/PasswordInput";
import TextInput from "#root/components/TextInput";
import { useTypeSafeTranslation } from "#root/lib/hooks/useTypeSafeTranslation";
import { FALLBACK_ROUTE_LOGGED_IN } from "#root/lib/constants";

import AuthController from "./AuthController";
import { useAuthStore } from "./useAuthStore";

type LoginPayload = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const { t } = useTypeSafeTranslation();
  const { accessToken } = useAuthStore();

  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginPayload>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (accessToken) {
      navigate(FALLBACK_ROUTE_LOGGED_IN, { replace: true });
    }
  }, [accessToken]);
  const from = location.state?.from?.pathname || FALLBACK_ROUTE_LOGGED_IN;

  const onSubmit = async (data: LoginPayload) => {
    setIsLoading(true);
    const signInResult = await AuthController.signIn({
      username: data.username,
      password: data.password,
    });

    if (signInResult.error || !signInResult.data) {
      enqueueSnackbar(signInResult.error, { variant: "error" });
      setIsLoading(false);
      return;
    }
    enqueueSnackbar(`${t("pages.login.successMessage")}`, { variant: "success" });
    setIsLoading(false);

    navigate(from, { replace: true });
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
            {t("common.login")}
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
              label={t("common.username")}
            />

            <PasswordInput
              control={control}
              defaultValue=""
              error={errors.password}
              isDisabled={isLoading}
              isRequired
              name="password"
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
              {t("common.login")}
            </LoadingButton>
            <Link href="/forgot-password" underline="hover" variant="body2">
              {t("common.forgot")}
            </Link>
          </Box>
        </Paper>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
};

export default LoginPage;
