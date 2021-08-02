/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindDishInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: FindDish
// ====================================================

export interface FindDish_findDish_dish_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface FindDish_findDish_dish_options {
  __typename: "DishOption";
  name: string;
  choices: FindDish_findDish_dish_options_choices[] | null;
}

export interface FindDish_findDish_dish {
  __typename: "Dish";
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
  options: FindDish_findDish_dish_options[] | null;
}

export interface FindDish_findDish {
  __typename: "FindDishOutput";
  ok: boolean;
  error: string | null;
  dish: FindDish_findDish_dish;
}

export interface FindDish {
  findDish: FindDish_findDish;
}

export interface FindDishVariables {
  input: FindDishInput;
}
