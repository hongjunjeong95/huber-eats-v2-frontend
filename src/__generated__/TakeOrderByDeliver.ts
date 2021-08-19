/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TakeOrderByDeliverInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: TakeOrderByDeliver
// ====================================================

export interface TakeOrderByDeliver_takeOrderByDeliver {
  __typename: "TakeOrderByDeliverOutput";
  ok: boolean;
  error: string | null;
}

export interface TakeOrderByDeliver {
  takeOrderByDeliver: TakeOrderByDeliver_takeOrderByDeliver;
}

export interface TakeOrderByDeliverVariables {
  input: TakeOrderByDeliverInput;
}
