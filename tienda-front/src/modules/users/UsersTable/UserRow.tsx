import { Delete, Edit, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Box, Collapse, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { Fragment, useState } from "react";

import IconButton from "#root/components/IconButton";

import { User } from "../types";

import { useTypeSafeTranslation } from "#root/lib/hooks/useTypeSafeTranslation";

type UserRowProps = {
  onDelete?: (user: User) => void;
  onEdit?: (user: User) => void;
  row: User;
};

const UserRow = ({ onDelete, onEdit, row }: UserRowProps) => {
  const { t } = useTypeSafeTranslation();

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell width="4rem">
          <IconButton
            aria-label="expand row"
            tip={t("common.details")}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          {row.username}
        </TableCell>

        <TableCell>{row.name}</TableCell>
        <TableCell>{row.role.description}</TableCell>
        <TableCell align="right">{row.activo.toString()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <Box sx={{ marginY: 2, marginX: 1 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography component="h5" variant="h6" gutterBottom>
                  {`${t("common.fullname")}: ${row.name} ${row.lastname}`}
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <IconButton
                    aria-label="update"
                    tip={t("common.update")}
                    iconButtonProps={{ color: "info" }}
                    onClick={() => onEdit?.(row)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    tip={t("common.delete")}
                    iconButtonProps={{ color: "error" }}
                    onClick={() => onDelete?.(row)}
                  >
                    <Delete />
                  </IconButton>
                </Stack>
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography component="p" marginY="1rem">
                    {t("common.email")}: {row.email}
                  </Typography>

                  <Typography component="p">
                    {t("common.username")}: {row.username}
                  </Typography>
                  <Typography component="p">
                    {t("pages.user.role")}: {row.role.description}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};
export default UserRow;
