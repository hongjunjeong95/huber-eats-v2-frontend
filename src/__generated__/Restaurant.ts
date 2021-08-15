/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Restaurant
// ====================================================

export interface Restaurant_menu {
  __typename: "Dish";
  name: string;
  price: number;
  description: string;
  photo: string;
}

export interface Restaurant {
  __typename: "Restaurant";
  menu: Restaurant_menu[] | null;
}
