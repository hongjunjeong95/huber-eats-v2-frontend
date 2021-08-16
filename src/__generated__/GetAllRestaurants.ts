/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetAllRestaurantsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetAllRestaurants
// ====================================================

export interface GetAllRestaurants_getAllRestaurants_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface GetAllRestaurants_getAllRestaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  address: string;
  category: GetAllRestaurants_getAllRestaurants_restaurants_category;
}

export interface GetAllRestaurants_getAllRestaurants {
  __typename: "GetAllRestaurantsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: GetAllRestaurants_getAllRestaurants_restaurants[];
}

export interface GetAllRestaurants {
  getAllRestaurants: GetAllRestaurants_getAllRestaurants;
}

export interface GetAllRestaurantsVariables {
  input: GetAllRestaurantsInput;
}
