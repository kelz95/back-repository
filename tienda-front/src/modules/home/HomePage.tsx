import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import logo from "#root/assets/pina.png";
import Copyright from "#root/components/Copyright";
import LanguageSwitcher from "#root/components/LanguageSwitcher";
import { namespaces } from "#root/translations/i18n.constants";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(namespaces.translation);

  const users = [
    { name: "Nombre1", imageSrc: "https://avatars.dicebear.com/api/avataaars/i1.svg" },
    { name: "Nombre2", imageSrc: "https://avatars.dicebear.com/api/avataaars/i2.svg" },
    { name: "Nombre3", imageSrc: "https://avatars.dicebear.com/api/avataaars/i3.svg" },
  ];

  return (
    <Box component="main">
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
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          marginTop="2rem"
          width="100%"
        >
          <Box marginLeft="2rem">
            <LanguageSwitcher logoColor="inherit" />
          </Box>
          <Button
            color="primary"
            onClick={() => navigate("/login")}
            size="large"
            sx={{ marginRight: "2rem" }}
            variant="contained"
          >
            {t("home.login")}
          </Button>
        </Stack>
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
          {t("home.title")}
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
          {t("home.group")}
        </Typography>

        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={4}>
          {users.map(user => (
            <Paper
              key={user.imageSrc}
              sx={{ paddingX: "1rem", paddingY: "1rem", maxWidth: "10rem" }}
            >
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
