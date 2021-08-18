import {
  UpdateOrderStatus,
  UpdateOrderStatusVariables,
} from "./../__generated__/UpdateOrderStatus";
import { PendingOrder } from "./../__generated__/PendingOrder";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  CreateOrder,
  CreateOrderVariables,
} from "../__generated__/CreateOrder";
import {
  CREATE_ORDER_MUTATION,
  FIND_ORDER_QUERY,
  PENDING_ORDER_SUBSCRIPTION,
  UPDATE_ORDER_MUTATION,
} from "./gqls/order.gql";
import { FindOrder, FindOrderVariables } from "../__generated__/FindOrder";

export const useFindOrderQuery = (orderId: number) =>
  useQuery<FindOrder, FindOrderVariables>(FIND_ORDER_QUERY, {
    variables: {
      input: {
        orderId,
      },
    },
  });

export const useCreateOrderMutation = (
  onCompleted?: (data: CreateOrder) => void
) =>
  useMutation<CreateOrder, CreateOrderVariables>(CREATE_ORDER_MUTATION, {
    onCompleted,
  });

export const useUpdateOrderStatusMutation = (
  onCompleted?: (data: UpdateOrderStatus) => void
) =>
  useMutation<UpdateOrderStatus, UpdateOrderStatusVariables>(
    UPDATE_ORDER_MUTATION,
    {
      onCompleted,
    }
  );

export const usePendingOrderSubscription = () =>
  useSubscription<PendingOrder>(PENDING_ORDER_SUBSCRIPTION);
