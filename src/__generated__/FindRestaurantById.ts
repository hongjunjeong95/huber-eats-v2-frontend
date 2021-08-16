/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindRestaurantByIdInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: FindRestaurantById
// ====================================================

export interface FindRestaurantById_findRestaurantById_restaurant_category {
  __typename: "Category";
  name: string;
}

export interface FindRestaurantById_findRestaurantById_restaurant_menu_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface FindRestaurantById_findRestaurantById_restaurant_menu_options {
  __typename: "DishOption";
  name: string;
  choices: FindRestaurantById_findRestaurantById_restaurant_menu_options_choices[] | null;
}

export interface FindRestaurantById_findRestaurantById_restaurant_menu {
  __typename: "Dish";
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
  options: FindRestaurantById_findRestaurantById_restaurant_menu_options[] | null;
}

export interface FindRestaurantById_findRestaurantById_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  address: string;
  category: FindRestaurantById_findRestaurantById_restaurant_category;
  menu: FindRestaurantById_findRestaurantById_restaurant_menu[] | null;
}

export interface FindRestaurantById_findRestaurantById {
  __typename: "FindRestaurantByIdOutput";
  ok: boolean;
  error: string | null;
  restaurant: FindRestaurantById_findRestaurantById_restaurant | null;
}

export interface FindRestaurantById {
  findRestaurantById: FindRestaurantById_findRestaurantById;
}

export interface FindRestaurantByIdVariables {
  input: FindRestaurantByIdInput;
}
