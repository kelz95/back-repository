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

import { useTypeSafeTranslation } from "#root/lib/hooks/useTypeSafeTranslation";

type CategoriesTableProps = {
  data: Category[];
  onDelete?: (category: Category) => void;
  onEdit?: (category: Category) => void;
};

const CategoriesTable = ({ data, onDelete, onEdit }: CategoriesTableProps) => {
  const { t } = useTypeSafeTranslation();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="categories table">
        <TableHead>
          <TableRow>
            <TableCell>{t("common.code")}</TableCell>
            <TableCell>{t("common.description")}</TableCell>
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
