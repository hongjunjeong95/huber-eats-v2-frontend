import { useMutation, useQuery } from "@apollo/client";
import {
  CreateRestaurant,
  CreateRestaurantVariables,
} from "../__generated__/CreateRestaurant";
import {
  DeleteRestaurant,
  DeleteRestaurantVariables,
} from "../__generated__/DeleteRestaurant";
import {
  EditRestaurant,
  EditRestaurantVariables,
} from "../__generated__/EditRestaurant";
import {
  FindMyRestaurantById,
  FindMyRestaurantByIdVariables,
} from "../__generated__/FindMyRestaurantById";
import {
  GetAllRestaurants,
  GetAllRestaurantsVariables,
} from "../__generated__/GetAllRestaurants";
import { GetMyRestaurants } from "../__generated__/GetMyRestaurants";
import {
  CREATE_RESTAURANT_MUTATION,
  DELETE_RESTAURANT_MUTATION,
  EDIT_RESTAURANT_MUTATION,
  FIND_MY_RESTAURANT,
  GET_ALL_RESTAURANTS,
  GET_MY_RESTAURANTS,
} from "./gqls/restaurant.gql";

// Owner Service

export const useGetMyRestaurants = () =>
  useQuery<GetMyRestaurants>(GET_MY_RESTAURANTS);

export const useFindMyRestaurantById = (
  id: number,
  onCompleted?: (data: FindMyRestaurantById) => void
) =>
  useQuery<FindMyRestaurantById, FindMyRestaurantByIdVariables>(
    FIND_MY_RESTAURANT,
    {
      variables: {
        input: {
          id,
        },
      },
      onCompleted,
    }
  );

export const useCreateRestaurantMutation = (
  onCompleted?: (data: CreateRestaurant) => void
) =>
  useMutation<CreateRestaurant, CreateRestaurantVariables>(
    CREATE_RESTAURANT_MUTATION,
    {
      onCompleted,
    }
  );

export const useEditRestaurantMutation = (
  onCompleted?: (data: EditRestaurant) => void
) =>
  useMutation<EditRestaurant, EditRestaurantVariables>(
    EDIT_RESTAURANT_MUTATION,
    {
      onCompleted,
    }
  );

export const useDeleteRestaurantMutation = (
  onCompleted?: (data: DeleteRestaurant) => void
) =>
  useMutation<DeleteRestaurant, DeleteRestaurantVariables>(
    DELETE_RESTAURANT_MUTATION,
    {
      onCompleted,
    }
  );

// Customer Service

export const useGetAllRestaurants = (
  page: number,
  onCompleted?: (data: GetAllRestaurants) => void
) =>
  useQuery<GetAllRestaurants, GetAllRestaurantsVariables>(GET_ALL_RESTAURANTS, {
    variables: {
      input: {
        page,
      },
    },
    onCompleted,
  });
