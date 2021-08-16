import { useMutation } from "@apollo/client";
import {
  CreateOrder,
  CreateOrderVariables,
} from "../__generated__/CreateOrder";
import { CREATE_ORDER_MUTATION } from "./gqls/order.gql";

export const useCreateOrderMutation = (
  onCompleted?: (data: CreateOrder) => void
) =>
  useMutation<CreateOrder, CreateOrderVariables>(CREATE_ORDER_MUTATION, {
    onCompleted,
  });
