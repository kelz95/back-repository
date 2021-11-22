import { Delete, Edit, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Box, Collapse, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { Fragment, useState } from "react";

import IconButton from "#root/components/IconButton";
import { IMAGE_FALLBACK_URL } from "#root/lib/constants";
import { useTypeSafeTranslation } from "#root/lib/hooks/useTypeSafeTranslation";
import isAdmin from "#root/lib/isAdmin";
import { useAuthStore } from "#root/modules/auth/useAuthStore";

import { Product } from "../types";

type ProductRowProps = {
  onDelete?: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onEditImage?: (product: Product) => void;
  row: Product;
};

const ProductRow = ({ onDelete, onEdit, onEditImage, row }: ProductRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { t } = useTypeSafeTranslation();
  const { user } = useAuthStore();

  const productImage = row.picture?.replace?.(/^http:\/\//i, "https://") || IMAGE_FALLBACK_URL;

  const isUserAdmin = isAdmin(user);

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
          {row.code}
        </TableCell>

        <TableCell>{row.name}</TableCell>
        <TableCell align="right">{row.quantity}</TableCell>
        <TableCell align="right">{row.unitPrice}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <Box sx={{ marginY: 2, marginX: 1 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography component="h5" variant="h6" gutterBottom>
                  {`${t("pages.product.product")}: ${row.code}-${row.name}`}
                </Typography>
                {isUserAdmin && (
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
                )}
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box sx={{ borderRadius: 2, padding: 2, width: "45%" }}>
                  <Typography component="p" marginY="1rem">
                    {t("common.description")}: {row.description}
                  </Typography>

                  <Typography component="p">
                    {t("pages.product.quantity")}: {row.quantity}
                  </Typography>
                  <Typography component="p">
                    {t("pages.product.unitPrice")}: {row.unitPrice}
                  </Typography>
                </Box>
                <Box sx={{ borderRadius: 2, padding: 2 }}>
                  <Typography component="h6" marginBottom="1rem" variant="h6">
                    {t("pages.product.category")}
                  </Typography>

                  <Typography component="p">
                    {t("common.code")}: {row.productCategory.code}
                  </Typography>
                  <Typography component="p">
                    {t("common.description")}: {row.productCategory.description}
                  </Typography>
                </Box>
                <Box
                  height="10rem"
                  onClick={() => isUserAdmin && onEditImage?.(row)}
                  sx={{ ":hover": isUserAdmin ? { cursor: "pointer", opacity: 0.5 } : undefined }}
                >
                  <img src={productImage} alt="product" height="100%" />
                </Box>
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};
export default ProductRow;
