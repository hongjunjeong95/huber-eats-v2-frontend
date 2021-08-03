import { DISH_FRAGMENT } from "./../fragments";
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

export const FIND_MY_RESTAURANT = gql`
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
  query FindMyRestaurantById($input: FindMyRestaurantByIdInput!) {
    findMyRestaurantById(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantFragment
        menu {
          ...DishFragment
        }
      }
    }
  }
`;

export const CREATE_RESTAURANT_MUTATION = gql`
  mutation CreateRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
      restaurantId
    }
  }
`;

export const EDIT_RESTAURANT_MUTATION = gql`
  ${RESTAURANT_FRAGMENT}
  mutation EditRestaurant($input: EditRestaurantInput!) {
    editRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantFragment
      }
    }
  }
`;
