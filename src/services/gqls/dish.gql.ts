import { gql } from "@apollo/client";
import { DISH_FRAGMENT } from "../fragments";

export const FIND_DISH_QUERY = gql`
  ${DISH_FRAGMENT}
  query FindDish($input: FindDishInput!) {
    findDish(input: $input) {
      ok
      error
      dish {
        ...DishFragment
      }
    }
  }
`;

export const CREATE_DISH_MUTATION = gql`
  mutation CreateDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

export const UPDATE_DISH_MUTATION = gql`
  mutation UpdateDish($input: UpdateDishInput!) {
    updateDish(input: $input) {
      ok
      error
    }
  }
`;

export const DELETE_DISH_MUTATION = gql`
  ${DISH_FRAGMENT}
  mutation DeleteDish($input: DeleteDishInput!) {
    deleteDish(input: $input) {
      ok
      error
      dish {
        ...DishFragment
      }
    }
  }
`;
