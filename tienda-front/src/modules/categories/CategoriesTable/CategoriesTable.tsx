import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { Category } from "../types";
import CategoryRow from "./CategoryRow";

import { useTranslation } from "react-i18next";
import { namespaces } from "#root/translations/i18n.constants";

type CategoriesTableProps = {
  data: Category[];
  onDelete?: (category: Category) => void;
  onEdit?: (category: Category) => void;
};

const CategoriesTable = ({ data, onDelete, onEdit }: CategoriesTableProps) => {
  const { t } = useTranslation(namespaces.pages.categoriesTable);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="categories table">
        <TableHead>
          <TableRow>
            <TableCell>{t("code")}</TableCell>
            <TableCell>{t("description")}</TableCell>
            <TableCell width="4rem" />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <CategoryRow
              key={row?.idProductCategory}
              row={row}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoriesTable;
