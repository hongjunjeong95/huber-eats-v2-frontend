/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindMyRestaurantByIdInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: FindMyRestaurantById
// ====================================================

export interface FindMyRestaurantById_findMyRestaurantById_restaurant_category {
  __typename: "Category";
  name: string;
}

export interface FindMyRestaurantById_findMyRestaurantById_restaurant_menu_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface FindMyRestaurantById_findMyRestaurantById_restaurant_menu_options {
  __typename: "DishOption";
  name: string;
  choices: FindMyRestaurantById_findMyRestaurantById_restaurant_menu_options_choices[] | null;
}

export interface FindMyRestaurantById_findMyRestaurantById_restaurant_menu {
  __typename: "Dish";
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
  options: FindMyRestaurantById_findMyRestaurantById_restaurant_menu_options[] | null;
}

export interface FindMyRestaurantById_findMyRestaurantById_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  address: string;
  category: FindMyRestaurantById_findMyRestaurantById_restaurant_category;
  menu: FindMyRestaurantById_findMyRestaurantById_restaurant_menu[] | null;
}

export interface FindMyRestaurantById_findMyRestaurantById {
  __typename: "FindMyRestaurantByIdOutput";
  ok: boolean;
  error: string | null;
  restaurant: FindMyRestaurantById_findMyRestaurantById_restaurant | null;
}

export interface FindMyRestaurantById {
  findMyRestaurantById: FindMyRestaurantById_findMyRestaurantById;
}

export interface FindMyRestaurantByIdVariables {
  input: FindMyRestaurantByIdInput;
}
