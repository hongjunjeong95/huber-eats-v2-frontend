import React, { memo, useState } from "react";
import { gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { client } from "../apollo";
import { useCreateDishMutation } from "../services/dish.service";
import { CreateDish } from "../__generated__/CreateDish";
import {
  dishDescriptionAtom,
  dishImgFileAtom,
  dishNameAtom,
  dishPriceAtom,
} from "../atoms/dish.atom";
import { DishOptionInputType } from "../__generated__/globalTypes";

interface IFormProps {
  [key: string]: string;
}

interface IChoiceArray {
  id: number;
  name: string;
  extra: number;
}

interface IOptionArray {
  id: number;
  name: string;
  choices: IChoiceArray[];
}

const AddMenuOptionForm: React.FC = memo(() => {
  const [uploading, setUploading] = useState<boolean>(false);
  const dishName = useRecoilValue(dishNameAtom);
  const dishPrice = useRecoilValue(dishPriceAtom);
  const dishDescription = useRecoilValue(dishDescriptionAtom);
  const dishFile = useRecoilValue(dishImgFileAtom);
  const [coverImg, setCoverImg] = useState<string>("");
  const [options, setOptionsNumber] = useState<IOptionArray[]>([]);
  const [optionObjects, setOptionObjects] = useState<DishOptionInputType[]>();

  const history = useHistory();
  const location = useLocation();
  const [, restaurantId] = location.search.split("?restaurantId=");

  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<IFormProps>({
    mode: "onChange",
  });

  const onCompleted = (data: CreateDish) => {
    const {
      createDish: { ok },
    } = data;
    if (ok) {
      client.writeFragment({
        id: `Restaurant:${restaurantId}`,
        fragment: gql`
          fragment Restaurant on Restaurant {
            menu {
              name
              price
              description
              photo
              options {
                name
                choices {
                  name
                  extra
                }
              }
            }
          }
        `,
        data: {
          menu: [
            {
              name: dishName,
              price: dishPrice,
              description: dishDescription,
              photo: coverImg,
              options: optionObjects,
            },
          ],
        },
      });
      history.push(`restaurant?restaurantId=${restaurantId}`);
    }
  };

  const [createDishMutation] = useCreateDishMutation(onCompleted);

  const onSubmit = async () => {
    try {
      setUploading(true);

      const { ...rest } = getValues();

      const submittedOptionObjects = options.map((option) => ({
        name: rest[`${option.id}-optionName`],
        choices: option.choices.map((choice) => ({
          name: rest[`${option.id}-${choice.id}-choiceName`],
          extra: +rest[`${option.id}-${choice.id}-choiceExtra`],
        })),
      }));

      setOptionObjects(submittedOptionObjects);

      const formBody = new FormData();
      formBody.append("file", dishFile);

      if (dishFile.name !== "") {
        const { url } = await (
          await fetch("http://localhost:4000/uploads/", {
            method: "POST",
            body: formBody,
          })
        ).json();
        setCoverImg(url);
      }

      createDishMutation({
        variables: {
          input: {
            name: dishName,
            price: +dishPrice,
            photo: coverImg,
            description: dishDescription,
            restaurantId: +restaurantId,
            options: optionObjects,
          },
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const addOptionBtn = () => {
    setOptionsNumber((options) => [
      ...options,
      {
        id: Date.now(),
        name: "",
        choices: [],
      },
    ]);
  };

  const addChoiceBtn = (optionId: number) => {
    const option = options.find((option) => option.id === optionId);
    const filteredOptions = options.filter((option) => option.id !== optionId);

    if (option) {
      setOptionsNumber([
        ...filteredOptions,
        {
          id: option.id,
          name: "",
          choices: [
            ...option.choices,
            {
              id: Date.now(),
              name: "",
              extra: 0,
            },
          ],
        },
      ]);
    }
  };

  return (
    <>
      <button onClick={addOptionBtn} className="button bg-green-400">
        Add a Option
      </button>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-3/4">
        <div>
          <div className="flex justify-between mb-4">
            <h3 className="font-bold text-lg">Dish Option</h3>
          </div>
          <div className="p-3 flex flex-col border border-gray-2 mb-10">
            {options.length !== 0 &&
              options.map((option) => (
                <div key={option.id} className="mb-4">
                  <div className="flex mb-4">
                    <h3 className="font-bold text-lg">Option Name : </h3>
                    <input
                      {...register(`${option.id}-optionName`)}
                      type="text"
                      placeholder="Option Name"
                      className="ml-2"
                    />
                  </div>
                  <button
                    onClick={() => addChoiceBtn(option.id)}
                    className="button mb-4 bg-green-400 text-sm py-1 px-2"
                  >
                    Add a Choice
                  </button>
                  <div className="grid gap-y-2">
                    {option.choices.length !== 0 &&
                      option.choices.map((choice) => (
                        <div key={choice.id} className="flex">
                          <input
                            {...register(
                              `${option.id}-${choice.id}-choiceName`,
                              {
                                required: "Menu name is required",
                              }
                            )}
                            type="text"
                            placeholder="Choice Name"
                            className="w-full"
                          />
                          <input
                            {...register(
                              `${option.id}-${choice.id}-choiceExtra`
                            )}
                            type="number"
                            placeholder="Choice Extra"
                            className="w-full"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <input
          className={`button text-lg font-medium focus:outline-none py-4 transition-colors
      ${
        isValid
          ? "bg-lime-600 hover:bg-lime-700"
          : "bg-gray-300 pointer-events-none"
      }`}
          type="submit"
          value={uploading ? "Loading..." : "Create Menu"}
        />
      </form>
    </>
  );
});

export default AddMenuOptionForm;

// todo
// Menu option 배열 만들기
