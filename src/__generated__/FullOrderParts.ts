/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: FullOrderParts
// ====================================================

export interface FullOrderParts_deliver {
  __typename: "User";
  email: string;
}

export interface FullOrderParts_customer {
  __typename: "User";
  email: string;
}

export interface FullOrderParts_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface FullOrderParts {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number;
  deliver: FullOrderParts_deliver | null;
  customer: FullOrderParts_customer;
  restaurant: FullOrderParts_restaurant;
}
