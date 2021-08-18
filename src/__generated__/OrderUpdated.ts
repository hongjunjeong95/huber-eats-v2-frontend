/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderUpdatedInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: OrderUpdated
// ====================================================

export interface OrderUpdated_orderUpdated_deliver {
  __typename: "User";
  email: string;
}

export interface OrderUpdated_orderUpdated_customer {
  __typename: "User";
  email: string;
}

export interface OrderUpdated_orderUpdated_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface OrderUpdated_orderUpdated {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number;
  deliver: OrderUpdated_orderUpdated_deliver | null;
  customer: OrderUpdated_orderUpdated_customer;
  restaurant: OrderUpdated_orderUpdated_restaurant;
}

export interface OrderUpdated {
  orderUpdated: OrderUpdated_orderUpdated;
}

export interface OrderUpdatedVariables {
  input: OrderUpdatedInput;
}
