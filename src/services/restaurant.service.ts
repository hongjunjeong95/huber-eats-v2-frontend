import { useMutation, useQuery } from "@apollo/client";
import {
  CreateRestaurant,
  CreateRestaurantVariables,
} from "../__generated__/CreateRestaurant";
import {
  FindMyRestaurantById,
  FindMyRestaurantByIdVariables,
} from "../__generated__/FindMyRestaurantById";
import { GetMyRestaurants } from "../__generated__/GetMyRestaurants";
import {
  CREATE_RESTAURANT_MUTATION,
  FIND_MY_RESTAURANT,
  GET_MY_RESTAURANTS,
} from "./gqls/restaurant.gql";

export const useGetMyRestaurants = () =>
  useQuery<GetMyRestaurants>(GET_MY_RESTAURANTS);

export const useCreateRestaurantMutation = (
  onCompleted?: (data: CreateRestaurant) => void
) =>
  useMutation<CreateRestaurant, CreateRestaurantVariables>(
    CREATE_RESTAURANT_MUTATION,
    {
      onCompleted,
    }
  );

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
