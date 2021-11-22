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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router";

import SrcLogo from "#root/assets/pina.png";
import SrcLogoNoLetters from "#root/assets/pina_sola.png";
import IconButton from "#root/components/IconButton";
import LanguageSwitcher from "#root/components/LanguageSwitcher";
import { useTypeSafeTranslation } from "#root/lib/hooks/useTypeSafeTranslation";
import isAdmin from "#root/lib/isAdmin";
import { useAuthStore } from "#root/modules/auth/useAuthStore";

const NavBar = () => {
  const { t } = useTypeSafeTranslation();

  const { user } = useAuthStore();
  const navigate = useNavigate();
  const theme = useTheme();
  const smallScreenOrBigger = useMediaQuery(theme.breakpoints.up("sm"));

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

  const isUserAdmin = isAdmin(user);

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
        <img src={smallScreenOrBigger ? SrcLogo : SrcLogoNoLetters} alt="logo" height="100%" />
      </Box>
      {user && (
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography
            color="white"
            fontSize="1.125rem"
            sx={{ display: { xs: "none", sm: "block" } }}
          >{`${t("navbar.welcome")}, ${user?.username}!`}</Typography>
          <IconButton onClick={handleProfileMenu} tip={t("navbar.menu")}>
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
              <ListItemText>{t("navbar.viewProducts")}</ListItemText>
            </MenuItem>

            {isUserAdmin && (
              <MenuItem onClick={handleViewCategories}>
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText>{t("navbar.viewCategories")}</ListItemText>
              </MenuItem>
            )}

            {isUserAdmin && (
              <MenuItem onClick={handleUsers}>
                <ListItemIcon>
                  <PersonAdd />
                </ListItemIcon>
                <ListItemText>{t("navbar.manageUsers")}</ListItemText>
              </MenuItem>
            )}

            <Divider />

            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText>{t("navbar.logout")}</ListItemText>
            </MenuItem>
          </Menu>
        </Stack>
      )}
    </Stack>
  );
};

export default NavBar;
