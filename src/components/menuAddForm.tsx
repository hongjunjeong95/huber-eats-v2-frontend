import { gql } from "@apollo/client";
import React, { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { client } from "../apollo";
import { useCreateDishMutation } from "../services/dish.service";
import { CreateDish } from "../__generated__/CreateDish";
import { Button } from "./button";
import { FormError } from "./form-error";

interface IFormProps {
  name: string;
  price: number;
  description: string;
  file: FileList;
  [key: string]: string | number | FileList;
}

const MenuAddForm: React.FC = memo(() => {
  const [uploading, setUploading] = useState<boolean>(false);
  const history = useHistory();
  const location = useLocation();
  const [, restaurantId] = location.search.split("?restaurantId=");
  // const [coverImg, setCoverImg] = useState<string>("");
  const [optionsNumber, setOptionsNumber] = useState<number[]>([]);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid, errors: formErrors },
  } = useForm<IFormProps>({
    mode: "onChange",
  });

  const onCompleted = (data: CreateDish) => {
    const {
      createDish: { ok },
    } = data;
    if (ok) {
      const { name, price, file, description } = getValues();

      const restaurant = client.readFragment({
        id: `Restaurant:${restaurantId}`,
        fragment: gql`
          fragment Restaurant on Restaurant {
            name
            menu {
              name
              price
              description
              photo
            }
          }
        `,
      });

      client.writeFragment({
        id: `Restaurant:${restaurantId}`,
        fragment: gql`
          fragment Restaurant on Restaurant {
            menu {
              name
              price
              description
              photo
            }
          }
        `,
        data: {
          menu: [
            ...restaurant.menu,
            {
              name,
              price,
              description,
              file,
            },
          ],
        },
      });
      history.push(`restaurant?restaurantId=${restaurantId}`);
    }
  };

  const [createDishMutation, { data }] = useCreateDishMutation(onCompleted);

  const onSubmit = async () => {
    try {
      setUploading(true);
      const { name, price, description, file } = getValues();

      let coverImg: string = "";
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

        coverImg = url;
      }
      createDishMutation({
        variables: {
          input: {
            name,
            price: +price,
            photo: coverImg,
            description,
            restaurantId: +restaurantId,
          },
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const addOptionBtn = () => {
    setOptionsNumber((current) => [Date.now(), ...current]);
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
      <div>
        <div className="flex justify-between mb-4">
          <h3 className="font-bold text-lg">Dish Option</h3>
          <button onClick={addOptionBtn} className="button bg-green-400">
            Add a Option
          </button>
        </div>
        <div className="flex flex-col input">
          {optionsNumber.length !== 0 &&
            optionsNumber.map((id) => (
              <div>
                <input
                  {...register(`${id}-optionName`, {
                    required: "Menu name is required",
                  })}
                  type="text"
                  placeholder="Option Name"
                />
                <input
                  {...register(`${id}-optionExtra`)}
                  type="number"
                  placeholder="Option Extra"
                />
              </div>
            ))}
        </div>
      </div>
      <Button canClick={isValid} actionText="Add Menu" loading={uploading} />
      {data?.createDish.error && (
        <FormError errorMessage={data.createDish.error} />
      )}
    </form>
  );
});

export default MenuAddForm;
