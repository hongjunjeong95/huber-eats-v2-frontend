/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMyRestaurants
// ====================================================

export interface GetMyRestaurants_getMyRestaurants_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface GetMyRestaurants_getMyRestaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  address: string;
  category: GetMyRestaurants_getMyRestaurants_restaurants_category;
}

export interface GetMyRestaurants_getMyRestaurants {
  __typename: "GetMyRestaurantsOutput";
  ok: boolean;
  error: string | null;
  restaurants: GetMyRestaurants_getMyRestaurants_restaurants[];
}

export interface GetMyRestaurants {
  getMyRestaurants: GetMyRestaurants_getMyRestaurants;
}
