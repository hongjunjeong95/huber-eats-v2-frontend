import React, { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { Button } from "./button";
import { FormError } from "./form-error";
import {
  dishDescriptionAtom,
  dishImgFileAtom,
  dishNameAtom,
  dishPriceAtom,
} from "../atoms/dish.atom";

interface IFormProps {
  name: string;
  price: number;
  description: string;
  file: FileList;
  [key: string]: string | number | FileList;
}

const AddMenuForm: React.FC = memo(() => {
  const [uploading, setUploading] = useState<boolean>(false);
  const setDishName = useSetRecoilState(dishNameAtom);
  const setDishPrice = useSetRecoilState(dishPriceAtom);
  const setDishDescription = useSetRecoilState(dishDescriptionAtom);
  const setDishImgFile = useSetRecoilState(dishImgFileAtom);

  const history = useHistory();
  const location = useLocation();
  const [, restaurantId] = location.search.split("?restaurantId=");

  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid, errors: formErrors },
  } = useForm<IFormProps>({
    mode: "onChange",
  });

  const onSubmit = async () => {
    try {
      setUploading(true);
      const { name, price, description, file } = getValues();

      if (file[0] !== undefined) {
        const actualFile = file[0];
        setDishImgFile(actualFile);
      }
      setDishName(name);
      setDishPrice(price);
      setDishDescription(description);

      history.push(`add-menu-options?restaurantId=${restaurantId}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-3/4">
      <input
        {...register("name", {
          required: "Menu name is required",
        })}
        className="input"
        type="text"
        placeholder="Menu Name"
      />
      {formErrors.name?.message && (
        <FormError errorMessage={formErrors.name.message} />
      )}
      <input
        {...register("price", {
          required: "Menu price is required",
        })}
        className="input"
        min={0}
        type="number"
        placeholder="Menu Price"
      />
      {formErrors.price?.message && (
        <FormError errorMessage={formErrors.price.message} />
      )}
      <textarea
        {...register("description")}
        className="textarea"
        placeholder="Menu Description"
        rows={5}
      />
      {formErrors.description?.message && (
        <FormError errorMessage={formErrors.description.message} />
      )}
      <input {...register("file")} className="input" type="file" />
      {formErrors.file?.message && (
        <FormError errorMessage={formErrors.file.message} />
      )}
      <Button canClick={isValid} actionText="Next" loading={uploading} />
    </form>
  );
});

export default AddMenuForm;
