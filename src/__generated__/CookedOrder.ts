/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: CookedOrder
// ====================================================

export interface CookedOrder_cookedOrder_deliver {
  __typename: "User";
  email: string;
}

export interface CookedOrder_cookedOrder_customer {
  __typename: "User";
  email: string;
}

export interface CookedOrder_cookedOrder_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
}

export interface CookedOrder_cookedOrder {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number;
  deliver: CookedOrder_cookedOrder_deliver | null;
  customer: CookedOrder_cookedOrder_customer;
  restaurant: CookedOrder_cookedOrder_restaurant;
}

export interface CookedOrder {
  cookedOrder: CookedOrder_cookedOrder;
}
