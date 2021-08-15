/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateDishInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateDish
// ====================================================

export interface UpdateDish_updateDish {
  __typename: "UpdateDishOutput";
  ok: boolean;
  error: string | null;
}

export interface UpdateDish {
  updateDish: UpdateDish_updateDish;
}

export interface UpdateDishVariables {
  input: UpdateDishInput;
}
