/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: EditRestaurant
// ====================================================

export interface EditRestaurant_editRestaurant_restaurant_category {
  __typename: "Category";
  name: string;
}

export interface EditRestaurant_editRestaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  address: string;
  category: EditRestaurant_editRestaurant_restaurant_category;
}

export interface EditRestaurant_editRestaurant {
  __typename: "EditRestaurantOutput";
  ok: boolean;
  error: string | null;
  restaurant: EditRestaurant_editRestaurant_restaurant;
}

export interface EditRestaurant {
  editRestaurant: EditRestaurant_editRestaurant;
}

export interface EditRestaurantVariables {
  input: EditRestaurantInput;
}
