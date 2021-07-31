import { gql } from "@apollo/client";
import { RESTAURANT_FRAGMENT } from "../fragments";

export const GET_MY_RESTAURANTS = gql`
  ${RESTAURANT_FRAGMENT}
  query GetMyRestaurants {
    getMyRestaurants {
      ok
      error
      restaurants {
        ...RestaurantFragment
      }
    }
  }
`;
