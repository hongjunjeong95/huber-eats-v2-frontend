import { gql } from "@apollo/client";
import { FULL_ORDER_FRAGMENT } from "../fragments";

// Query

export const FIND_ORDER_QUERY = gql`
  ${FULL_ORDER_FRAGMENT}
  query FindOrder($input: FindOrderInput!) {
    findOrder(input: $input) {
      ok
      error
      order {
        ...FullOrderParts
      }
    }
  }
`;

// Mutation

export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
      orderId
    }
  }
`;

export const UPDATE_ORDER_MUTATION = gql`
  mutation UpdateOrderStatus($input: UpdateOrderStatusInput!) {
    updateOrderStatus(input: $input) {
      ok
      error
    }
  }
`;

export const TAKE_ORDER_BY_DELIVER_MUTATION = gql`
  mutation TakeOrderByDeliver($input: TakeOrderByDeliverInput!) {
    takeOrderByDeliver(input: $input) {
      ok
      error
    }
  }
`;

// Subscription

export const PENDING_ORDER_SUBSCRIPTION = gql`
  ${FULL_ORDER_FRAGMENT}
  subscription PendingOrder {
    pendingOrder {
      ...FullOrderParts
    }
  }
`;

export const ORDER_UPDATED_SUBSCRIPTION = gql`
  ${FULL_ORDER_FRAGMENT}
  subscription OrderUpdated($input: OrderUpdatedInput!) {
    orderUpdated(input: $input) {
      ...FullOrderParts
    }
  }
`;

export const COOKED_ORDER_SUBSCRIPTION = gql`
  ${FULL_ORDER_FRAGMENT}
  subscription CookedOrder {
    cookedOrder {
      ...FullOrderParts
    }
  }
`;
