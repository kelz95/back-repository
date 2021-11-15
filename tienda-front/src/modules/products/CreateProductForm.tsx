import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEventHandler, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useCategoryStore } from "#root/modules/categories/useCategoryStore";
import { namespaces } from "#root/translations/i18n.constants";

export type CreateProductFormPayload = {
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;

  productCategory: string;
  productImage: File;
};

type CreateProductFormProps = {
  onSubmit: (payload: CreateProductFormPayload) => void;
};

const CreateProductForm = ({ onSubmit }: CreateProductFormProps) => {
  const { categories } = useCategoryStore();
  const { t } = useTranslation(namespaces.pages.cProductForm);
  const { control, handleSubmit } = useForm<CreateProductFormPayload>();

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = evt => {
    if (!evt) return;
    const image = evt?.target?.files?.[0] || null;
    setImageFile(image);
  };

  const preSubmit = (payload: CreateProductFormPayload) => {
    console.log({ payload });
    if (!imageFile) return;
    onSubmit({ ...payload, productImage: imageFile });
  };

  const categoryOptions = categories.map(c => ({ value: c.code, label: c.code }));

  return (
    <Box component="form" onSubmit={handleSubmit(preSubmit)} sx={{ mt: 1 }}>
      <Controller
        control={control}
        defaultValue=""
        name="name"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField autoFocus fullWidth label={t("name")} margin="normal" required {...field} />
        )}
      />
      <Controller
        control={control}
        defaultValue=""
        name="description"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField fullWidth label={t("description")} margin="normal" required {...field} />
        )}
      />
      <Controller
        control={control}
        defaultValue={1}
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
        defaultValue={1.0}
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
        defaultValue=""
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

      <Typography variant="caption" display="block">
        Imagen
      </Typography>

      <input type="file" name="productImage" onChange={handleImageChange} />

      <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }}>
        {t("create")}
      </Button>
    </Box>
  );
};

export default CreateProductForm;
