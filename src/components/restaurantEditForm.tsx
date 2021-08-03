import React, { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { client } from "../apollo";
import { FIND_MY_RESTAURANT } from "../services/gqls/restaurant.gql";
import { useEditRestaurantMutation } from "../services/restaurant.service";
import { EditRestaurant } from "../__generated__/EditRestaurant";
import { Button } from "./button";
import { FormError } from "./form-error";

interface IDishForm {
  formName: string;
  formAddress: string;
  formCategoryName: string;
  formCoverImg: string;
  restaurantId: string;
}

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
}

const RestaurantEditForm: React.FC<IDishForm> = memo(
  ({ formName, formAddress, formCategoryName, formCoverImg, restaurantId }) => {
    const [name, setName] = useState<string>(formName);
    const [address, setAddress] = useState<string>(formAddress);
    const [categoryName, setCategoryName] = useState<string>(formCategoryName);
    const [coverImg, setCoverImg] = useState<string>(formCoverImg);

    const [uploading, setUploading] = useState<boolean>(false);
    const history = useHistory();

    const onChangeName = (e: any) => {
      const {
        target: { value },
      } = e;
      setName(value);
    };

    const onChangeAddress = (e: any) => {
      const {
        target: { value },
      } = e;
      setAddress(value);
    };

    const onChangeCategoryName = (e: any) => {
      const {
        target: { value },
      } = e;
      setCategoryName(value);
    };

    const {
      register,
      getValues,
      handleSubmit,
      formState: { isValid, errors: formErrors },
    } = useForm<IFormProps>({
      mode: "onChange",
    });

    const onCompleted = (data: EditRestaurant) => {
      const {
        editRestaurant: { ok },
      } = data;

      if (ok) {
        const { name, address, categoryName } = getValues();
        setUploading(false);
        const queryResult = client.readQuery({
          query: FIND_MY_RESTAURANT,
          variables: { input: { id: +restaurantId } },
        });

        client.writeQuery({
          query: FIND_MY_RESTAURANT,
          variables: {
            input: {
              id: +restaurantId,
            },
          },
          data: {
            findMyRestaurantById: {
              ...queryResult.findMyRestaurantById,
              restaurant: {
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
              ...queryResult.findMyRestaurantById.restaurant,
            },
          },
        });
      }
      history.push(`myRestaurant?restaurantId=${restaurantId}`);
    };

    const [editRestaurantMutation, { data, loading }] =
      useEditRestaurantMutation(onCompleted);
    const onSubmit = async () => {
      try {
        setUploading(true);
        const { name, address, categoryName, file } = getValues();

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

          setCoverImg(url);
          editRestaurantMutation({
            variables: {
              input: {
                name,
                address,
                categoryName,
                coverImg,
                restaurantId: +restaurantId,
              },
            },
          });
        } else {
          editRestaurantMutation({
            variables: {
              input: {
                name,
                address,
                categoryName,
                restaurantId: +restaurantId,
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
            required: "Restaurant name is required",
          })}
          className="input"
          type="text"
          placeholder="Restaurant Name"
          value={name}
          onChange={onChangeName}
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
          value={address}
          onChange={onChangeAddress}
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
          value={categoryName}
          onChange={onChangeCategoryName}
        />
        {formErrors.categoryName?.message && (
          <FormError errorMessage={formErrors.categoryName.message}></FormError>
        )}
        <input {...register("file")} className="input" type="file" />
        <Button
          canClick={isValid}
          actionText="Edit Restaurant"
          loading={uploading || loading}
        />
        {data?.editRestaurant.error && (
          <FormError errorMessage={data.editRestaurant.error} />
        )}
      </form>
    );
  }
);

export default RestaurantEditForm;
