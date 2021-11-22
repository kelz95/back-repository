import { Add, Download, Search } from "@mui/icons-material";
import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

import { useTranslation } from "react-i18next";
import { namespaces } from "#root/translations/i18n.constants";

type ToolbarProps = {
  onCreate?: () => void;
  onExport?: () => void;
  searchLabel?: string;
  searchValue?: string;
  setSearchValue?: Dispatch<SetStateAction<string>>;

  withSearchBar?: boolean;
  withCreate?: boolean;
  withExport?: boolean;
  createButtonText?: string;
  exportButtonText?: string;
};

const Toolbar = ({
  onCreate,
  onExport,
  searchLabel,
  searchValue,
  setSearchValue,

  withSearchBar,
  withCreate = true,
  withExport,

  createButtonText = "Create product",
  exportButtonText = "Export",
}: ToolbarProps) => {
  const { t } = useTranslation(namespaces.pages.toolbar);
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
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
          label={searchLabel || t("defaultSearchLabel")}
          variant="outlined"
          value={searchValue}
          onChange={evt => setSearchValue?.(evt.target.value)}
        />
      )}
      {!withSearchBar && <div />}
      <Stack direction={{ xs: "column", md: "row" }} marginTop={{ xs: 2, md: 0 }} spacing={2}>
        {withExport && (
          <Button onClick={onExport} startIcon={<Download fontSize="large" />} variant="outlined">
            {exportButtonText}
          </Button>
        )}
        {withCreate && (
          <Button onClick={onCreate} startIcon={<Add fontSize="large" />} variant="outlined">
            {createButtonText}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default Toolbar;
