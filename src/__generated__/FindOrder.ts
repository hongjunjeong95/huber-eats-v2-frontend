/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindOrderInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: FindOrder
// ====================================================

export interface FindOrder_findOrder_order_deliver {
  __typename: "User";
  email: string;
}

export interface FindOrder_findOrder_order_customer {
  __typename: "User";
  email: string;
}

export interface FindOrder_findOrder_order_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface FindOrder_findOrder_order {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number;
  deliver: FindOrder_findOrder_order_deliver | null;
  customer: FindOrder_findOrder_order_customer;
  restaurant: FindOrder_findOrder_order_restaurant;
}

export interface FindOrder_findOrder {
  __typename: "FindOrderOutput";
  ok: boolean;
  error: string | null;
  order: FindOrder_findOrder_order | null;
}

export interface FindOrder {
  findOrder: FindOrder_findOrder;
}

export interface FindOrderVariables {
  input: FindOrderInput;
}
