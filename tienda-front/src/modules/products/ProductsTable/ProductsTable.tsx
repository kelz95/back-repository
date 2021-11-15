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

import { Product } from "#root/modules/products/types";

import ProductRow from "./ProductRow";

import { useTranslation } from "react-i18next";
import { namespaces } from "#root/translations/i18n.constants";

type ProductsTableProps = {
  data: Product[];
  onDelete?: (product: Product) => void;
  onEdit?: (product: Product) => void;

  rowsPerPage: number;
  page: number;
  setPage: (val: number) => void;
  setRowsPerPage: (val: number) => void;
};

const ProductsTable = ({
  data,
  onDelete,
  onEdit,
  rowsPerPage,
  page,
  setPage,
  setRowsPerPage,
}: ProductsTableProps) => {
  const { t } = useTranslation(namespaces.pages.productsTable);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="products table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>{t("code")}</TableCell>
            <TableCell>{t("name")}</TableCell>
            <TableCell align="right">{t("quantity")}</TableCell>
            <TableCell align="right">{t("uPrice")} (USD)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <ProductRow key={row?.name} row={row} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: `${t("all")}`, value: -1 }]}
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
              // ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
