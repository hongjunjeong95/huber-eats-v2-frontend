import {
  TakeOrderByDeliver,
  TakeOrderByDeliverVariables,
} from "./../__generated__/TakeOrderByDeliver";
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
  COOKED_ORDER_SUBSCRIPTION,
  CREATE_ORDER_MUTATION,
  FIND_ORDER_QUERY,
  PENDING_ORDER_SUBSCRIPTION,
  TAKE_ORDER_BY_DELIVER_MUTATION,
  UPDATE_ORDER_MUTATION,
} from "./gqls/order.gql";
import { FindOrder, FindOrderVariables } from "../__generated__/FindOrder";
import { CookedOrder } from "../__generated__/CookedOrder";

// Query

export const useFindOrderQuery = (orderId: number) =>
  useQuery<FindOrder, FindOrderVariables>(FIND_ORDER_QUERY, {
    variables: {
      input: {
        orderId,
      },
    },
  });

// Mutation

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

export const useTakeOrderByDeliverMutation = (
  onCompleted?: (data: TakeOrderByDeliver) => void
) =>
  useMutation<TakeOrderByDeliver, TakeOrderByDeliverVariables>(
    TAKE_ORDER_BY_DELIVER_MUTATION,
    {
      onCompleted,
    }
  );

// Subscription

export const usePendingOrderSubscription = () =>
  useSubscription<PendingOrder>(PENDING_ORDER_SUBSCRIPTION);

export const useCookedOrderSubscription = () =>
  useSubscription<CookedOrder>(COOKED_ORDER_SUBSCRIPTION);
