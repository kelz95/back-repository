import { Add, Search } from "@mui/icons-material";
import { InputAdornment, Stack, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

import IconButton from "#root/components/IconButton";

type ToolbarProps = {
  onCreate?: () => void;
  searchValue?: string;
  setSearchValue?: Dispatch<SetStateAction<string>>;
};

const Toolbar = ({ onCreate, searchValue, setSearchValue }: ToolbarProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      marginBottom="1.5rem"
      paddingX="0rem"
    >
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        label="Search"
        variant="outlined"
        value={searchValue}
        onChange={evt => setSearchValue?.(evt.target.value)}
      />
      <IconButton aria-label="create product" tip="Create new product" onClick={onCreate}>
        <Add color="primary" fontSize="large" />
      </IconButton>
    </Stack>
  );
};

export default Toolbar;
