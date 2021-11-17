import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

import { User } from "../types";
import UserRow from "./UserRow";

import { useTranslation } from "react-i18next";
import { namespaces } from "#root/translations/i18n.constants";

type UsersTableProps = {
  data: User[];
  onDelete?: (user: User) => void;
  onEdit?: (user: User) => void;

  rowsPerPage: number;
  page: number;
  setPage: (val: number) => void;
  setRowsPerPage: (val: number) => void;
};

const UsersTable = ({
  data,
  onDelete,
  onEdit,
  rowsPerPage,
  page,
  setPage,
  setRowsPerPage,
}: UsersTableProps) => {
  const { t } = useTranslation(namespaces.pages.userTable);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="products table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>{t("username")}</TableCell>
            <TableCell>{t("name")}</TableCell>
            <TableCell>{t("role")}</TableCell>
            <TableCell align="right">{t("active")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <UserRow key={row?.name} row={row} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{ inputProps: { "aria-label": "rows per page" }, native: true }}
              onPageChange={(evt, newPage) => setPage(newPage)}
              onRowsPerPageChange={evt => {
                setRowsPerPage(parseInt(evt.target.value, 10));
                setPage(0);
              }}
              labelRowsPerPage={t("rowsPerPage")}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
