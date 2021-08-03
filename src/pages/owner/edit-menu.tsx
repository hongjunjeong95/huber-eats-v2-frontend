import React, { memo } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { FIND_MY_RESTAURANT } from "../../services/gqls/restaurant.gql";
import {
  useFindDishQuery,
  useUpdateDishMutation,
} from "../../services/dish.service";
import { useEffect } from "react";

interface IFormProps {
  name: string;
  price: number;
  description: string;
  file: FileList;
}

const EditMenu = memo(() => {
  const [uploading, setUploading] = useState<boolean>(false);
  const history = useHistory();
  const location = useLocation();
  const [, queryParams] = location.search.split("?restaurantId=");
  let [restaurantId, dishId] = queryParams.split("&dishId=");

  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<IFormProps>({
    mode: "onChange",
  });

  const useFindDishQueryArgs = {
    dishId: +dishId,
    restaurantId: +restaurantId,
  };

  const { data: dishData } = useFindDishQuery(useFindDishQueryArgs);
  const [updateDishMutation, { data: updateDishData }] =
    useUpdateDishMutation();

  const [dishName, setDishName] = useState<string>(
    dishData?.findDish.dish.name ? dishData?.findDish.dish.name : ""
  );
  const [dishPrice, setDishPrice] = useState<number>(
    dishData?.findDish.dish.price ? dishData?.findDish.dish.price : 0
  );
  const [dishDescription, setDishDescription] = useState<string>(
    dishData?.findDish.dish.description
      ? dishData?.findDish.dish.description
      : ""
  );

  // server에서 dish data를 가져오면 state를 갱신하여 form value의 default값을 초기화 한다.
  useEffect(() => {
    if (dishData?.findDish.dish.name) {
      setDishName(dishData?.findDish.dish.name);
    }
    if (dishData?.findDish.dish.price) {
      setDishPrice(dishData?.findDish.dish.price);
    }
    if (dishData?.findDish.dish.description) {
      setDishDescription(dishData?.findDish.dish.description);
    }
  }, [dishData]);
  // const [optionNames, setOptionNames] = useState<string[]>(
  //   dishData?.findDish.dish.options!.map((option) => option!.name)
  // );
  // const [optionExtras, setOptionExtras] = useState<number[]>(
  //   dishData?.findDish.dish.options!.map((option) => option!.extra)
  // );
  // const [ingredientNames, setIngredientNames] = useState<string[]>(
  //   dishData?.findDish.dish.ingredients!.map((ingredient) => ingredient!.stock!.name)
  // );
  // const [ingredientCounts, setIngredientCounts] = useState<number[]>(
  //   dishData?.findDish.dish.ingredients!.map((ingredient) => ingredient!.count)
  // );

  const onSubmit = async () => {
    try {
      setUploading(true);
      const { name, price, description, file } = getValues();

      let coverImg: string | undefined = "";
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
      } else {
        coverImg = dishData?.findDish.dish.photo;
      }

      updateDishMutation({
        variables: {
          input: {
            name,
            price: +price,
            photo: coverImg,
            description,
            restaurantId: +restaurantId,
            id: +dishId,
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

    history.push(`myRestaurant?restaurantId=${restaurantId}`);
  };

  const onChangeName = (e: any) => {
    const {
      target: { value },
    } = e;
    setDishName(value);
  };

  const onChangePrice = (e: any) => {
    const {
      target: { value },
    } = e;
    setDishPrice(value);
  };

  const onChangeDescription = (e: any) => {
    const {
      target: { value },
    } = e;
    setDishDescription(value);
  };

  return (
    <div className="w-full flex justify-center min-h-screen pb-20">
      <Helmet>
        <title>Edit Menu | Huber Eats</title>
      </Helmet>
      <div className="shadow-2xl border lg:w-1/3 py-10 flex max-h-screen flex-col justify-center items-center">
        <h4 className="font-semibold text-2xl mb-4">Edit Menu</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-3/4">
          <input
            {...register("name", {
              required: "Menu name is required",
            })}
            className="input"
            type="text"
            placeholder="Menu Name"
            value={dishName}
            onChange={onChangeName}
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
            value={dishPrice}
            onChange={onChangePrice}
          />
          {errors.price?.message && (
            <FormError errorMessage={errors.price.message} />
          )}
          <textarea
            {...register("description")}
            className="textarea"
            placeholder="Menu Description"
            rows={5}
            value={dishDescription}
            onChange={onChangeDescription}
          />
          {errors.description?.message && (
            <FormError errorMessage={errors.description.message} />
          )}
          <input {...register("file")} className="input" type="file" />
          {errors.file?.message && (
            <FormError errorMessage={errors.file.message} />
          )}
          <Button
            canClick={isValid}
            actionText="Edit Menu"
            loading={uploading}
          />
          {updateDishData?.updateDish.error && (
            <FormError errorMessage={updateDishData.updateDish.error} />
          )}
        </form>
        <button className="button bg-gray-400 mt-4 w-3/4">
          <Link to={`/myRestaurant?restaurantId=${restaurantId}`}>Back</Link>
        </button>
      </div>
    </div>
  );
});

export default EditMenu;
