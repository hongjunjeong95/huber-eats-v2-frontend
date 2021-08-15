import { gql } from "@apollo/client";
import React, { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { client } from "../apollo";
import { useUpdateDishMutation } from "../services/dish.service";
import { UpdateDish } from "../__generated__/UpdateDish";
import { Button } from "./button";
import { FormError } from "./form-error";

interface IFormProps {
  name: string;
  price: number;
  description: string;
  file: FileList;
  [key: string]: string | number | FileList;
}

interface IDishEditFormProps {
  formName: string;
  formPrice: number;
  formDescription: string;
  formDishImg: string;
  restaurantId: string;
  dishId: string;
}

const MenuEditForm: React.FC<IDishEditFormProps> = memo(
  ({
    formName,
    formPrice,
    formDescription,
    formDishImg,
    restaurantId,
    dishId,
  }) => {
    const [photo, setPhoto] = useState<string>(formDishImg ?? "");
    const [uploading, setUploading] = useState<boolean>(false);
    const history = useHistory();

    const {
      register,
      getValues,
      handleSubmit,
      formState: { isValid, errors },
    } = useForm<IFormProps>({
      mode: "onChange",
      defaultValues: {
        name: formName,
        price: formPrice,
        description: formDescription,
      },
    });

    const onCompleted = (data: UpdateDish) => {
      const {
        updateDish: { ok },
      } = data;

      if (ok) {
        const { name, price, description } = getValues();
        setUploading(false);

        const dish = client.readFragment({
          id: `Dish:${dishId}`,
          fragment: gql`
            fragment EditedDish on Dish {
              name
              price
              description
              photo
            }
          `,
        });

        console.log(dish);

        client.writeFragment({
          id: `Dish:${dishId}`,
          fragment: gql`
            fragment EditedDish on Dish {
              name
              price
              description
              photo
            }
          `,
          data: {
            ...dish,
            name,
            price,
            description,
            photo,
          },
        });
        history.push(`myRestaurant?restaurantId=${restaurantId}`);
      }
    };

    const [updateDishMutation, { data: updateDishData }] =
      useUpdateDishMutation(onCompleted);

    const onSubmit = async () => {
      try {
        setUploading(true);
        const { name, price, description, file } = getValues();

        if (file[0] !== undefined) {
          const actualFile = file[0];
          const formBody = new FormData();
          formBody.append("file", actualFile);
          const { url } = await (
            await fetch("http://localhost:4000/uploads/", {
              method: "POST",
              body: formBody,
            })
          ).json();

          setPhoto(url);
          updateDishMutation({
            variables: {
              input: {
                name,
                price: +price,
                photo: photo,
                description,
                restaurantId: +restaurantId,
                id: +dishId,
              },
            },
          });
        } else {
          updateDishMutation({
            variables: {
              input: {
                name,
                price: +price,
                description,
                restaurantId: +restaurantId,
                id: +dishId,
              },
            },
          });
        }
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
        {errors.name?.message && (
          <FormError errorMessage={errors.name.message} />
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
        {errors.price?.message && (
          <FormError errorMessage={errors.price.message} />
        )}
        <textarea
          {...register("description")}
          className="textarea"
          placeholder="Menu Description"
          rows={5}
        />
        {errors.description?.message && (
          <FormError errorMessage={errors.description.message} />
        )}
        <input {...register("file")} className="input" type="file" />
        {errors.file?.message && (
          <FormError errorMessage={errors.file.message} />
        )}
        <Button canClick={isValid} actionText="Edit Menu" loading={uploading} />
        {updateDishData?.updateDish.error && (
          <FormError errorMessage={updateDishData.updateDish.error} />
        )}
      </form>
    );
  }
);

export default MenuEditForm;
