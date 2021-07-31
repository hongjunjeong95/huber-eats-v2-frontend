import { useQuery } from "@apollo/client";
import { GetMyRestaurants } from "../__generated__/GetMyRestaurants";
import { GET_MY_RESTAURANTS } from "./gqls/restaurant.gql";

export const useGetMyRestaurants = () =>
  useQuery<GetMyRestaurants>(GET_MY_RESTAURANTS);
