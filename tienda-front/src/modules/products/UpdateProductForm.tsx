import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import SelectInput from "#root/components/SelectInput";
import TextInput from "#root/components/TextInput";
import { useCategoryStore } from "#root/modules/categories/useCategoryStore";
import { useTypeSafeTranslation } from "#root/lib/hooks/useTypeSafeTranslation";

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
  const { t } = useTypeSafeTranslation();
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
        label={t("common.code")}
      />

      <TextInput
        control={control}
        defaultValue={data.name}
        error={errors.name}
        isDisabled={isLoading}
        isRequired
        name="name"
        label={t("common.name")}
      />

      <TextInput
        control={control}
        defaultValue={data.description}
        error={errors.description}
        isDisabled={isLoading}
        isRequired
        name="description"
        label={t("common.description")}
      />

      <TextInput
        control={control}
        defaultValue={data.quantity}
        error={errors.quantity}
        isDisabled={isLoading}
        isRequired
        name="quantity"
        label={t("pages.product.quantity")}
        type="number"
      />

      <TextInput
        control={control}
        defaultValue={data.unitPrice}
        error={errors.unitPrice}
        isDisabled={isLoading}
        isRequired
        name="unitPrice"
        label={t("pages.product.unitPrice")}
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
        label={t("pages.product.category")}
        placeholder={t("pages.product.selectCategory")}
      />

      <LoadingButton fullWidth loading={isLoading} type="submit" variant="contained" sx={{ mt: 3 }}>
        {t("common.update")}
      </LoadingButton>
    </Box>
  );
};

export default UpdateProductForm;
