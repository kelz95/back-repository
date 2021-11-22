import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import FileInput from "#root/components/FileInput";
import SelectInput from "#root/components/SelectInput";
import TextInput from "#root/components/TextInput";
import { useCategoryStore } from "#root/modules/categories/useCategoryStore";
import { namespaces } from "#root/translations/i18n.constants";

export type CreateProductFormPayload = {
  name: string;
  code: string;
  description: string;
  quantity: number;
  unitPrice: number;

  productCategory: string;
  productImage?: File;
};

const schema = yup.object().shape({
  name: yup.string().required("Please enter a name"),
  code: yup.string().required("Please enter a code"),
  description: yup.string().required("Please enter a description"),
  quantity: yup.number().required("Please enter a quantity"),
  unitPrice: yup.number().required("Please enter the unit price"),

  productCategory: yup.string().required("Please enter a category"),
  // productImage: yup
  //   .mixed()
  //   .test("required", "You need to provide a file", value => {
  //     return value && value.length;
  //   })
  //   .test("fileSize", "The file is too large", (value, context) => {
  //     return value && value[0] && value[0].size <= 200000;
  //   })
  //   .test("type", "We only support jpeg", function (value) {
  //     return value && value[0] && value[0].type === "image/jpeg";
  //   }),
});

type CreateProductFormProps = {
  onSubmit: (payload: CreateProductFormPayload) => void;
  isLoading?: boolean;
};

const CreateProductForm = ({ onSubmit, isLoading }: CreateProductFormProps) => {
  const { categories } = useCategoryStore();
  const { t } = useTranslation(namespaces.translation);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateProductFormPayload>({ resolver: yupResolver(schema) });

  const categoryOptions = categories.map(c => ({ value: c.code, label: c.code }));

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <TextInput
        autoFocus
        control={control}
        defaultValue=""
        error={errors.code}
        isDisabled={isLoading}
        isRequired
        name="code"
        label={t("createProductForm.code")}
      />

      <TextInput
        control={control}
        defaultValue=""
        error={errors.name}
        isDisabled={isLoading}
        isRequired
        name="name"
        label={t("createProductForm.name")}
      />

      <TextInput
        control={control}
        defaultValue=""
        error={errors.description}
        isDisabled={isLoading}
        isRequired
        name="description"
        label={t("createProductForm.description")}
      />

      <TextInput
        control={control}
        defaultValue={1}
        error={errors.quantity}
        isDisabled={isLoading}
        isRequired
        name="quantity"
        label={t("createProductForm.quantity")}
        type="number"
      />

      <TextInput
        control={control}
        defaultValue={1.0}
        error={errors.unitPrice}
        isDisabled={isLoading}
        isRequired
        name="unitPrice"
        label={t("createProductForm.unitPrice")}
        type="number"
      />

      <SelectInput
        control={control}
        defaultValue=""
        error={errors.productCategory}
        options={categoryOptions}
        isDisabled={isLoading}
        isRequired
        id="productcategory-label"
        name="productCategory"
        label={t("createProductForm.category")}
        placeholder={t("createProductForm.selectCategory")}
      />

      <FileInput
        control={control}
        error={errors.productImage}
        isDisabled={isLoading}
        // isRequired
        name="productImage"
        id="password-input"
        label={t("createProductForm.image")}
        helperText="Ingrese una imagen"
      />

      <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }}>
        {t("createProductForm.create")}
      </Button>
    </Box>
  );
};

export default CreateProductForm;
