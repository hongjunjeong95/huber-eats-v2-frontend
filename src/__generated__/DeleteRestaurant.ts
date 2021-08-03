/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteRestaurant
// ====================================================

export interface DeleteRestaurant_deleteRestaurant {
  __typename: "DeleteRestaurantOutput";
  ok: boolean;
  error: string | null;
}

export interface DeleteRestaurant {
  deleteRestaurant: DeleteRestaurant_deleteRestaurant;
}

export interface DeleteRestaurantVariables {
  input: DeleteRestaurantInput;
}
