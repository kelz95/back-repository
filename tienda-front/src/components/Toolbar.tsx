import { Add, Search } from "@mui/icons-material";
import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

import { useTranslation } from "react-i18next";
import { namespaces } from "#root/translations/i18n.constants";

type ToolbarProps = {
  onCreate?: () => void;
  searchValue?: string;
  setSearchValue?: Dispatch<SetStateAction<string>>;

  withSearchBar?: boolean;
  createButtonText?: string;
};

const Toolbar = ({
  onCreate,
  searchValue,
  setSearchValue,

  withSearchBar,

  createButtonText = "Create product",
}: ToolbarProps) => {
  const { t } = useTranslation(namespaces.pages.toolbar);
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      marginBottom="1.5rem"
      paddingX="0rem"
    >
      {withSearchBar && (
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          label={t("search")}
          variant="outlined"
          value={searchValue}
          onChange={evt => setSearchValue?.(evt.target.value)}
        />
      )}
      {!withSearchBar && <div />}
      <Button onClick={onCreate} startIcon={<Add fontSize="large" />} variant="outlined">
        {createButtonText}
      </Button>
    </Stack>
  );
};

export default Toolbar;
