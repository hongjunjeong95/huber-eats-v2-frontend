import React, { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { client } from "../apollo";
import { GET_MY_RESTAURANTS } from "../services/gqls/restaurant.gql";
import { useCreateRestaurantMutation } from "../services/restaurant.service";
import { CreateRestaurant } from "../__generated__/CreateRestaurant";
import { Button } from "./button";
import { FormError } from "./form-error";

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
}

const RestaurantCreateForm: React.FC = memo(() => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [coverImg, setCoverImg] = useState<string>("");
  const history = useHistory();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid, errors: formErrors },
  } = useForm<IFormProps>({
    mode: "onChange",
  });

  const onCompleted = (data: CreateRestaurant) => {
    const {
      createRestaurant: { ok, restaurantId },
    } = data;

    if (ok) {
      const { name, address, categoryName } = getValues();
      setUploading(false);
      const queryResult = client.readQuery({ query: GET_MY_RESTAURANTS });
      client.writeQuery({
        query: GET_MY_RESTAURANTS,
        data: {
          getMyRestaurants: {
            ...queryResult.getMyRestaurants,
            restaurants: [
              {
                id: restaurantId,
                __typename: "Restaurant",
                name,
                coverImg,
                address,
                category: {
                  __typename: "Category",
                  name: categoryName,
                },
              },
              ...queryResult.getMyRestaurants.restaurants,
            ],
          },
        },
      });
    }
    history.push("/");
  };

  const [createRestaurantMutation, { data, loading }] =
    useCreateRestaurantMutation(onCompleted);
  const onSubmit = async () => {
    try {
      setUploading(true);
      const { name, address, categoryName, file } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const { url: coverImg } = await (
        await fetch("http://localhost:4000/uploads/", {
          method: "POST",
          body: formBody,
        })
      ).json();
      setCoverImg(coverImg);

      createRestaurantMutation({
        variables: {
          input: {
            name,
            address,
            categoryName,
            coverImg,
          },
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-3/4">
      <input
        {...register("name", {
          required: "Restaurant name is required",
        })}
        className="input"
        type="text"
        placeholder="Restaurant Name"
      />
      {formErrors.name?.message && (
        <FormError errorMessage={formErrors.name.message}></FormError>
      )}
      <input
        {...register("address", {
          required: "Restaurant address is required",
        })}
        className="input"
        type="text"
        placeholder="Restaurant Address"
      />
      {formErrors.address?.message && (
        <FormError errorMessage={formErrors.address.message}></FormError>
      )}
      <input
        {...register("categoryName", {
          required: "Restaurant category is required",
        })}
        className="input"
        type="text"
        placeholder="Restaurant Category"
      />
      {formErrors.categoryName?.message && (
        <FormError errorMessage={formErrors.categoryName.message}></FormError>
      )}
      <input {...register("file")} className="input" type="file" />
      <Button
        canClick={isValid}
        actionText="Add Restaurant"
        loading={uploading || loading}
      />
      {data?.createRestaurant.error && (
        <FormError errorMessage={data.createRestaurant.error} />
      )}
    </form>
  );
});

export default RestaurantCreateForm;
