import {
  AccountCircle,
  Dashboard,
  LocalGroceryStore,
  Logout,
  PersonAdd,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router";

import SrcLogo from "#root/assets/pina.png";
import IconButton from "#root/components/IconButton";
import LanguageSwitcher from "#root/components/LanguageSwitcher";
import { useAuthStore } from "#root/modules/auth/useAuthStore";

import { useTranslation } from "react-i18next";
import { namespaces } from "#root/translations/i18n.constants";

const NavBar = () => {
  const { t } = useTranslation(namespaces.pages.navbar);

  const { user } = useAuthStore();
  const navigate = useNavigate();
  const theme = useTheme();

  const [profileAnchorEl, setProfileAnchorEl] = useState<HTMLElement | null>(null);

  const handleLogout = () => {
    useAuthStore.getState().nullify();
  };

  const handleProfileMenu = (event: MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setProfileAnchorEl(null);
  };

  const handleProducts = () => {
    setProfileAnchorEl(null);
    navigate("/products");
  };

  const handleViewCategories = () => {
    setProfileAnchorEl(null);
    navigate("/categories");
  };

  const handleUsers = () => {
    setProfileAnchorEl(null);
    navigate("/users");
  };

  return (
    <Stack
      component="nav"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      paddingX="2rem"
      bgcolor={theme.palette.primary.light}
    >
      <Box height="5rem" paddingY="0.5rem">
        <img src={SrcLogo} alt="logo" height="100%" />
      </Box>
      {user && (
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography color="white" fontSize="1.125rem">{`${t("welcome")}, ${
            user?.username
          }!`}</Typography>
          <IconButton onClick={handleProfileMenu} tip={t("menu")}>
            <AccountCircle htmlColor="white" fontSize="large" />
          </IconButton>
          <LanguageSwitcher />

          <Menu
            anchorEl={profileAnchorEl}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            keepMounted
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            open={Boolean(profileAnchorEl)}
            onClose={handleCloseProfile}
          >
            <MenuItem onClick={handleProducts}>
              <ListItemIcon>
                <LocalGroceryStore />
              </ListItemIcon>
              <ListItemText>{t("viewProducts")}</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleViewCategories}>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText>{t("viewCategories")}</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleUsers}>
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText>{t("manageUsers")}</ListItemText>
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText>{t("logout")}</ListItemText>
            </MenuItem>
          </Menu>
        </Stack>
      )}
    </Stack>
  );
};

export default NavBar;
