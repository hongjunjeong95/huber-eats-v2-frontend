import { useMutation, useQuery } from "@apollo/client";
import {
  CreateRestaurant,
  CreateRestaurantVariables,
} from "../__generated__/CreateRestaurant";
import { GetMyRestaurants } from "../__generated__/GetMyRestaurants";
import {
  CREATE_RESTAURANT_MUTATION,
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
