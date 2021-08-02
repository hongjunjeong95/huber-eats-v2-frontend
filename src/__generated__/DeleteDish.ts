/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteDishInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteDish
// ====================================================

export interface DeleteDish_deleteDish_dish_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface DeleteDish_deleteDish_dish_options {
  __typename: "DishOption";
  name: string;
  choices: DeleteDish_deleteDish_dish_options_choices[] | null;
}

export interface DeleteDish_deleteDish_dish {
  __typename: "Dish";
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
  options: DeleteDish_deleteDish_dish_options[] | null;
}

export interface DeleteDish_deleteDish {
  __typename: "DeleteDishOutput";
  ok: boolean;
  error: string | null;
  dish: DeleteDish_deleteDish_dish;
}

export interface DeleteDish {
  deleteDish: DeleteDish_deleteDish;
}

export interface DeleteDishVariables {
  input: DeleteDishInput;
}
