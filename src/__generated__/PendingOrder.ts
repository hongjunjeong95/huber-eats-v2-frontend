/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: PendingOrder
// ====================================================

export interface PendingOrder_pendingOrder_deliver {
  __typename: "User";
  email: string;
}

export interface PendingOrder_pendingOrder_customer {
  __typename: "User";
  email: string;
}

export interface PendingOrder_pendingOrder_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface PendingOrder_pendingOrder {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number;
  deliver: PendingOrder_pendingOrder_deliver | null;
  customer: PendingOrder_pendingOrder_customer;
  restaurant: PendingOrder_pendingOrder_restaurant;
}

export interface PendingOrder {
  pendingOrder: PendingOrder_pendingOrder;
}
