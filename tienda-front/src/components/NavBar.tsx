import { Box, Stack, Typography, useTheme } from "@mui/material";

import { Logout } from "@mui/icons-material";

import SrcLogo from "#root/assets/pina.png";
import IconButton from "#root/components/IconButton";
import { useAuthStore } from "#root/modules/auth/useAuthStore";

const NavBar = () => {
  const { user } = useAuthStore();
  const theme = useTheme();

  if (!user) {
    useAuthStore.getState().setUser({ id: 1, username: "demito", roles: [] });
  }

  return (
    <Stack
      component="nav"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      bgcolor={theme.palette.primary.light}
    >
      <Box height="5rem" paddingY="0.5rem">
        <img src={SrcLogo} alt="logo" height="100%" />
      </Box>
      {user && (
        <Stack direction="row" spacing={4} alignItems="center">
          <Typography color="white" fontSize="1.125rem">{`Welcome, ${user?.username}!`}</Typography>
          <IconButton tip="Logout">
            <Logout htmlColor="white" fontSize="large" />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
};

export default NavBar;
