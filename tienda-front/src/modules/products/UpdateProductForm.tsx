import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import SelectInput from "#root/components/SelectInput";
import TextInput from "#root/components/TextInput";
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

const schema = yup.object().shape({
  name: yup.string().required("Please enter a name"),
  code: yup.string().required("Please enter a code"),
  description: yup.string().required("Please enter a description"),
  quantity: yup.number().required("Please enter a quantity"),
  unitPrice: yup.number().required("Please enter the unit price"),
  productCategory: yup.string().required("Please enter a category"),
});

type UpdateProductFormProps = {
  data: Product;
  onSubmit: (payload: UpdateProductFormPayload) => void;
  isLoading?: boolean;
};

const UpdateProductForm = ({ data, onSubmit, isLoading }: UpdateProductFormProps) => {
  const { categories } = useCategoryStore();
  const { t } = useTranslation(namespaces.pages.cProductForm);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateProductFormPayload>({ resolver: yupResolver(schema) });

  const preSubmit = (payload: UpdateProductFormPayload) => {
    onSubmit({ ...payload });
  };

  const categoryOptions = categories.map(c => ({ value: c.code, label: c.code }));

  return (
    <Box component="form" onSubmit={handleSubmit(preSubmit)} sx={{ mt: 1 }}>
      <TextInput
        autoFocus
        control={control}
        defaultValue={data.code}
        error={errors.code}
        isDisabled={isLoading}
        isRequired
        name="code"
        label={t("createProductForm.code")}
      />

      <TextInput
        control={control}
        defaultValue={data.name}
        error={errors.name}
        isDisabled={isLoading}
        isRequired
        name="name"
        label={t("createProductForm.name")}
      />

      <TextInput
        control={control}
        defaultValue={data.description}
        error={errors.description}
        isDisabled={isLoading}
        isRequired
        name="description"
        label={t("createProductForm.description")}
      />

      <TextInput
        control={control}
        defaultValue={data.quantity}
        error={errors.quantity}
        isDisabled={isLoading}
        isRequired
        name="quantity"
        label={t("createProductForm.quantity")}
        type="number"
      />

      <TextInput
        control={control}
        defaultValue={data.unitPrice}
        error={errors.unitPrice}
        isDisabled={isLoading}
        isRequired
        name="unitPrice"
        label={t("createProductForm.unitPrice")}
        type="number"
      />

      <SelectInput
        control={control}
        defaultValue={data.productCategory.code}
        error={errors.productCategory}
        options={categoryOptions}
        isDisabled={isLoading}
        isRequired
        id="productcategory-label"
        name="productCategory"
        label={t("createProductForm.category")}
        placeholder={t("createProductForm.selectCategory")}
      />

      <LoadingButton fullWidth loading={isLoading} type="submit" variant="contained" sx={{ mt: 3 }}>
        {t("update")}
      </LoadingButton>
    </Box>
  );
};

export default UpdateProductForm;
