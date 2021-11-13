import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";

import Copyright from "../../components/Copyright";
import PineappleIcon from "../../assets/pina_sola.png";
import AuthController from "./AuthController";

type LoginPayload = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit } = useForm<LoginPayload>();

  const from = location.state?.from?.pathname || "/products";

  const onSubmit = async (data: LoginPayload) => {
    const signInResult = await AuthController.signIn({
      username: data.username,
      password: data.password,
    });

    if (signInResult.error || !signInResult.data) {
      enqueueSnackbar(signInResult.error, { variant: "error" });
      return;
    }
    enqueueSnackbar("Logueado exitosamente", { variant: "success" });
    navigate(from, { replace: true });
  };

  const title = "Login";
  const labelUsername = "Username";
  const labelPassword = "Password";
  const buttonText = "Login";

  return (
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
          {title}
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
                fullWidth
                id="username"
                label={labelUsername}
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
                fullWidth
                id="password"
                label={labelPassword}
                margin="normal"
                required
                type="password"
                {...field}
              />
            )}
          />

          <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            {buttonText}
          </Button>
        </Box>
      </Paper>

      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default LoginPage;
