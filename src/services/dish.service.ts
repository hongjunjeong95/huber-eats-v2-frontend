import { useMutation } from "@apollo/client";
import { CreateDish, CreateDishVariables } from "../__generated__/CreateDish";
import { CREATE_DISH_MUTATION } from "./gqls/dish.gql";

export const useCreateDishMutation = (
  onCompleted?: (data: CreateDish) => void
) =>
  useMutation<CreateDish, CreateDishVariables>(CREATE_DISH_MUTATION, {
    onCompleted,
  });
