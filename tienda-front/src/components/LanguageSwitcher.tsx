import { ChevronRight, Translate } from "@mui/icons-material";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { MouseEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import IconButton from "#root/components/IconButton";
import { languagesMap, namespaces } from "#root/translations/i18n.constants";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation(namespaces.common);

  const [languagesAnchorEl, setLanguagesAnchorEl] = useState<HTMLElement | null>(null);

  const handleLanguagesMenu = (event: MouseEvent<HTMLElement>) => {
    setLanguagesAnchorEl(event.currentTarget);
  };

  const handleCloseLanguages = () => {
    setLanguagesAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleLanguagesMenu} tip="Change language">
        <Translate htmlColor="white" fontSize="large" />
      </IconButton>
      <Menu
        anchorEl={languagesAnchorEl}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        keepMounted
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        open={Boolean(languagesAnchorEl)}
        onClose={handleCloseLanguages}
      >
        {languagesMap.map(lang => (
          <MenuItem
            key={lang.value}
            disabled={lang.value === i18n.language}
            onClick={() => {
              i18n.changeLanguage(lang.value);
              handleCloseLanguages();
            }}
          >
            <ListItemIcon>
              {lang.value === i18n.language ? <ChevronRight /> : undefined}
            </ListItemIcon>
            <ListItemText>{lang.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
