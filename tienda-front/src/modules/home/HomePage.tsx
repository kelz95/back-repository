import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";

import logo from "../../assets/pina.png";
import Copyright from "../../components/Copyright";

const HomePage = () => {
  const navigate = useNavigate();

  const users = [
    { name: "Nombre1", imageSrc: "https://avatars.dicebear.com/api/avataaars/i1.svg" },
    { name: "Nombre2", imageSrc: "https://avatars.dicebear.com/api/avataaars/i2.svg" },
    { name: "Nombre3", imageSrc: "https://avatars.dicebear.com/api/avataaars/i3.svg" },
  ];

  return (
    <Box>
      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          marginX: "auto",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Button
          color="primary"
          onClick={() => navigate("login")}
          size="large"
          sx={{
            alignSelf: "end",
            marginRight: "2rem",
            marginTop: "1.5rem",
          }}
          variant="contained"
        >
          Login
        </Button>
        <Box sx={{ marginTop: "8rem", width: "50rem" }}>
          <img src={logo} alt="logo" loading="lazy" style={{ width: "100%" }} />
        </Box>

        <Typography
          component="h1"
          variant="h3"
          sx={{
            marginTop: "2rem",
            borderWidth: "1px",
            borderColor: "white",
            borderRadius: "10px",
          }}
        >
          Inventory Management System
        </Typography>
      </Box>

      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          marginX: "auto",
          marginBottom: "1.25rem",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          sx={{
            marginTop: "2rem",
            marginBottom: "1.25rem",
            borderWidth: "1px",
            borderColor: "white",
            borderRadius: "10px",
          }}
        >
          Desarrollado por el grupo 3
        </Typography>

        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={4}>
          {users.map(user => (
            <Paper sx={{ paddingX: "1rem", paddingY: "1rem" }}>
              <img alt={user.name} src={user.imageSrc} />
              <Typography component="h3" variant="subtitle1" sx={{ marginTop: "2rem" }}>
                {user.name}
              </Typography>
            </Paper>
          ))}
        </Stack>
      </Box>

      <Copyright />
    </Box>
  );
};

export default HomePage;
