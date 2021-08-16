import { DISH_FRAGMENT } from "./../fragments";
import { gql } from "@apollo/client";
import { RESTAURANT_FRAGMENT } from "../fragments";

// Owner Gql

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

export const DELETE_RESTAURANT_MUTATION = gql`
  mutation DeleteRestaurant($input: DeleteRestaurantInput!) {
    deleteRestaurant(input: $input) {
      ok
      error
    }
  }
`;

// Customer Gql

export const GET_ALL_RESTAURANTS = gql`
  ${RESTAURANT_FRAGMENT}
  query GetAllRestaurants($input: GetAllRestaurantsInput!) {
    getAllRestaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantFragment
      }
    }
  }
`;
