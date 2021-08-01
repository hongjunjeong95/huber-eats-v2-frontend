import { gql } from "@apollo/client";

export const RESTAURANT_FRAGMENT = gql`
  fragment RestaurantFragment on Restaurant {
    id
    name
    coverImg
    address
    category {
      name
    }
  }
`;

export const DISH_FRAGMENT = gql`
  fragment DishFragment on Dish {
    id
    name
    description
    price
    options {
      name
      choices {
        name
        extra
      }
    }
  }
`;
