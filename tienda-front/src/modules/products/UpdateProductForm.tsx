import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useCategoryStore } from "#root/modules/categories/useCategoryStore";
import { namespaces } from "#root/translations/i18n.constants";

import { Product } from "./types";

export type UpdateProductFormPayload = {
  name: string;
  code: string;
  description: string;
  quantity: number;
  unitPrice: number;

  productCategory: string;
};

type UpdateProductFormProps = {
  data: Product;
  onSubmit: (payload: UpdateProductFormPayload) => void;
};

const UpdateProductForm = ({ data, onSubmit }: UpdateProductFormProps) => {
  const { categories } = useCategoryStore();
  const { t } = useTranslation(namespaces.pages.cProductForm);
  const { control, handleSubmit } = useForm<UpdateProductFormPayload>();

  const preSubmit = (payload: UpdateProductFormPayload) => {
    onSubmit({ ...payload });
  };

  const categoryOptions = categories.map(c => ({ value: c.code, label: c.code }));

  return (
    <Box component="form" onSubmit={handleSubmit(preSubmit)} sx={{ mt: 1 }}>
      <Controller
        control={control}
        defaultValue={data.code}
        name="code"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField autoFocus fullWidth label="Código" margin="normal" required {...field} />
          // <TextField autoFocus fullWidth label={t("name")} margin="normal" required {...field} />
        )}
      />
      <Controller
        control={control}
        defaultValue={data.name}
        name="name"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField fullWidth label={t("name")} margin="normal" required {...field} />
        )}
      />
      <Controller
        control={control}
        defaultValue={data.description}
        name="description"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField fullWidth label={t("description")} margin="normal" required {...field} />
        )}
      />
      <Controller
        control={control}
        defaultValue={data.quantity}
        name="quantity"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            fullWidth
            label={t("quantity")}
            margin="normal"
            required
            type="number"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        defaultValue={data.unitPrice}
        name="unitPrice"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            fullWidth
            label={t("uPrice")}
            margin="normal"
            required
            type="number"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        defaultValue={data.productCategory.code}
        name="productCategory"
        rules={{ required: true }}
        render={({ field }) => (
          <FormControl fullWidth required variant="outlined">
            <InputLabel id="product-category-label">Categoría</InputLabel>
            <Select
              // label={t("uPrice")}
              label="Categoría"
              labelId="product-category-label"
              {...field}
            >
              <MenuItem disabled value="">
                <em>Selecciona una categoría</em>
              </MenuItem>
              {categoryOptions.map(c => (
                <MenuItem key={c.value} value={c.value}>
                  {c.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }}>
        {t("create")}
      </Button>
    </Box>
  );
};

export default UpdateProductForm;
