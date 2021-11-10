import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import Copyright from "../../components/Copyright";
import PineappleIcon from "../../assets/pina_sola.png";

type LoginPayload = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { control, handleSubmit } = useForm<LoginPayload>();

  const onSubmit = (data: LoginPayload) => {
    alert(JSON.stringify(data, null, 2));
  };

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
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Controller
            control={control}
            defaultValue=""
            name="email"
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                autoFocus
                autoComplete="email"
                fullWidth
                id="email"
                label="Email Address"
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
                autoFocus
                autoComplete="current-password"
                fullWidth
                id="password"
                label="Password"
                margin="normal"
                required
                type="password"
                {...field}
              />
            )}
          />

          <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
        </Box>
      </Paper>

      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default LoginPage;
