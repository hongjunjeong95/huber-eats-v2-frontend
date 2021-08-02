import React, { memo } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { FIND_MY_RESTAURANT } from "../../services/gqls/restaurant.gql";
import { useCreateDishMutation } from "../../services/dish.service";
import { CreateDish } from "../../__generated__/CreateDish";

interface IFormProps {
  name: string;
  price: number;
  description: string;
  file: FileList;
}

const AddMenu = memo(() => {
  const [uploading, setUploading] = useState<boolean>(false);
  const history = useHistory();
  const location = useLocation();
  const [_, restaurantId] = location.search.split("?restaurantId=");
  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<IFormProps>({
    mode: "onChange",
  });

  const onCompleted = (data: CreateDish) => {
    history.push(`myRestaurant?restaurantId=${restaurantId}`);
  };

  const [createDishMutation, { data }] = useCreateDishMutation(onCompleted);
  const onSubmit = async () => {
    try {
      setUploading(true);
      const { name, price, description, file } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const { url: coverImg } = await (
        await fetch("http://localhost:4000/uploads/", {
          method: "POST",
          body: formBody,
        })
      ).json();

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
        refetchQueries: [
          {
            query: FIND_MY_RESTAURANT,
            variables: {
              input: {
                id: +restaurantId,
              },
            },
          },
        ],
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full flex justify-center min-h-screen pb-20">
      <Helmet>
        <title>Add Menu| Huber Eats</title>
      </Helmet>
      <div className="shadow-2xl border lg:w-1/3 py-10 flex max-h-screen flex-col justify-center items-center">
        <h4 className="font-semibold text-2xl mb-4">Add Menu</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-3/4">
          <input
            {...register("name", {
              required: "Menu name is required",
            })}
            className="input"
            type="text"
            placeholder="Menu Name"
          />
          <input
            {...register("price", {
              required: "Menu price is required",
            })}
            className="input"
            min={0}
            type="number"
            placeholder="Menu Price"
          />
          <textarea
            {...register("description")}
            className="textarea"
            placeholder="Menu Description"
            rows={5}
          />
          <input {...register("file")} className="input" type="file" />
          <Button
            canClick={isValid}
            actionText="Add Menu"
            loading={uploading}
          />
          {data?.createDish.error && (
            <FormError errorMessage={data.createDish.error} />
          )}
        </form>
        <button className="button bg-gray-400 mt-4 w-3/4">
          <Link to={`/myRestaurant?restaurantId=${restaurantId}`}>Back</Link>
        </button>
      </div>
    </div>
  );
});

export default AddMenu;
