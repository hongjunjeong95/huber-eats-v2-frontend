/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateOrderStatusInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateOrderStatus
// ====================================================

export interface UpdateOrderStatus_updateOrderStatus {
  __typename: "UpdateOrderStatusOutput";
  ok: boolean;
  error: string | null;
}

export interface UpdateOrderStatus {
  updateOrderStatus: UpdateOrderStatus_updateOrderStatus;
}

export interface UpdateOrderStatusVariables {
  input: UpdateOrderStatusInput;
}
