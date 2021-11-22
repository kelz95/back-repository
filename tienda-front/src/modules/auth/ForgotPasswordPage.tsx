import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Container, Link, Paper, Typography, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";

import PineappleIcon from "#root/assets/pina_sola.png";
import Copyright from "#root/components/Copyright";
import LanguageSwitcher from "#root/components/LanguageSwitcher";
import TextInput from "#root/components/TextInput";
import { useTypeSafeTranslation } from "#root/lib/hooks/useTypeSafeTranslation";

import AuthController from "./AuthController";

type ForgotPasswordPayload = {
  usernameOrEmail: string;
};

const ForgotPasswordPage = () => {
  const { t } = useTypeSafeTranslation();

  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ForgotPasswordPayload>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: ForgotPasswordPayload) => {
    setIsLoading(true);
    const apiResponse = await AuthController.requestRestorePassword({
      parametro: data.usernameOrEmail,
    });

    if (apiResponse.error || !apiResponse.data) {
      enqueueSnackbar(apiResponse.error, { variant: "error" });
      setIsLoading(false);
      return;
    }
    enqueueSnackbar(`${t("pages.forgotPassword.success")}`, { variant: "success" });
    setIsLoading(false);
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
            {t("common.forgot")}
          </Typography>

          <Typography component="p" variant="body1" marginTop="1rem">
            {t("pages.forgotPassword.description")}
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextInput
              autoFocus
              control={control}
              defaultValue=""
              error={errors.usernameOrEmail}
              isDisabled={isLoading}
              isRequired
              name="usernameOrEmail"
              helperText={t("pages.forgotPassword.helperText")}
              label={t("pages.forgotPassword.usernameOrEmail")}
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
          <Link href="/login" underline="hover" variant="body2">
            {t("common.return")}
          </Link>
        </Paper>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
};

export default ForgotPasswordPage;
