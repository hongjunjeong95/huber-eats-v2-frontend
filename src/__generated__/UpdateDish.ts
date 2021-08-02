/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateDishInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateDish
// ====================================================

export interface UpdateDish_updateDish_dish_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface UpdateDish_updateDish_dish_options {
  __typename: "DishOption";
  name: string;
  choices: UpdateDish_updateDish_dish_options_choices[] | null;
}

export interface UpdateDish_updateDish_dish {
  __typename: "Dish";
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
  options: UpdateDish_updateDish_dish_options[] | null;
}

export interface UpdateDish_updateDish {
  __typename: "UpdateDishOutput";
  ok: boolean;
  error: string | null;
  dish: UpdateDish_updateDish_dish;
}

export interface UpdateDish {
  updateDish: UpdateDish_updateDish;
}

export interface UpdateDishVariables {
  input: UpdateDishInput;
}
