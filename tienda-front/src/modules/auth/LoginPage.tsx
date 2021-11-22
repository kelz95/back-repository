import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Container, Paper, TextField, Typography, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";

import PineappleIcon from "#root/assets/pina_sola.png";
import Copyright from "#root/components/Copyright";
import LanguageSwitcher from "#root/components/LanguageSwitcher";
import { useTypeSafeTranslation } from "#root/lib/hooks/useTypeSafeTranslation";

import AuthController from "./AuthController";

type LoginPayload = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const { t } = useTypeSafeTranslation();

  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit } = useForm<LoginPayload>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const from = location.state?.from?.pathname || "/products";

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
            <Controller
              control={control}
              defaultValue=""
              name="username"
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  autoFocus
                  disabled={isLoading}
                  fullWidth
                  id="username"
                  label={t("common.username")}
                  margin="normal"
                  required
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              defaultValue=""
              name="password"
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  autoComplete="current-password"
                  disabled={isLoading}
                  fullWidth
                  id="password"
                  label={t("common.password")}
                  margin="normal"
                  required
                  type="password"
                  {...field}
                />
              )}
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
          </Box>
        </Paper>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
};

export default LoginPage;
