import React, { memo } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { client } from "../../apollo";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { GET_MY_RESTAURANTS } from "../../services/gqls/restaurant.gql";
import { useCreateRestaurantMutation } from "../../services/restaurant.service";
import { CreateRestaurant } from "../../__generated__/CreateRestaurant";

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
}

const AddRestaurant = memo(() => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [coverImg, setCoverImg] = useState<string>("");
  const history = useHistory();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid, errors },
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

  const [createRestaurantMutation, { data, loading, error }] =
    useCreateRestaurantMutation(onCompleted);
  const onsubmit = async () => {
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
    <div className="w-full flex justify-center">
      <div className="shadow-2xl border w-1/3 py-10 flex max-h-screen flex-col justify-center items-center">
        <h4 className="font-semibold text-2xl mb-4">Add Restaurant</h4>
        <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col w-3/4">
          <input
            {...register("name", {
              required: "Restaurant name is required",
            })}
            className="input"
            type="text"
            placeholder="Restaurant Name"
          />
          <input
            {...register("address", {
              required: "Restaurant address is required",
            })}
            className="input"
            type="text"
            placeholder="Restaurant Address"
          />
          <input
            {...register("categoryName", {
              required: "Restaurant category is required",
            })}
            className="input"
            type="text"
            placeholder="Restaurant Category"
          />
          <input {...register("file")} className="input" type="file" />
          <Button
            canClick={isValid}
            actionText="Add Restaurant"
            loading={uploading}
          />
          {data?.createRestaurant.error && (
            <FormError errorMessage={data.createRestaurant.error} />
          )}
        </form>
      </div>
    </div>
  );
});

export default AddRestaurant;
