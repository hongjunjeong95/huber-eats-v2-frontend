import { useMutation, useQuery } from "@apollo/client";
import { CreateDish, CreateDishVariables } from "../__generated__/CreateDish";
import { DeleteDish, DeleteDishVariables } from "../__generated__/DeleteDish";
import { FindDish, FindDishVariables } from "../__generated__/FindDish";
import { UpdateDish, UpdateDishVariables } from "../__generated__/UpdateDish";
import {
  CREATE_DISH_MUTATION,
  DELETE_DISH_MUTATION,
  FIND_DISH_QUERY,
  UPDATE_DISH_MUTATION,
} from "./gqls/dish.gql";

interface IUseFindDishArgs {
  restaurantId: number;
  dishId: number;
}

export const useFindDishQuery = (
  { dishId, restaurantId }: IUseFindDishArgs,
  onCompleted?: (data: FindDish) => void
) =>
  useQuery<FindDish, FindDishVariables>(FIND_DISH_QUERY, {
    onCompleted,
    variables: {
      input: {
        id: dishId,
        restaurantId,
      },
    },
  });

export const useCreateDishMutation = (
  onCompleted?: (data: CreateDish) => void
) =>
  useMutation<CreateDish, CreateDishVariables>(CREATE_DISH_MUTATION, {
    onCompleted,
  });

export const useUpdateDishMutation = (
  onCompleted?: (data: UpdateDish) => void
) =>
  useMutation<UpdateDish, UpdateDishVariables>(UPDATE_DISH_MUTATION, {
    onCompleted,
  });

export const useDeleteDishMutation = (
  onCompleted?: (data: DeleteDish) => void
) =>
  useMutation<DeleteDish, DeleteDishVariables>(DELETE_DISH_MUTATION, {
    onCompleted,
  });
