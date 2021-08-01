import { gql } from "@apollo/client";

export const CREATE_DISH_MUTATION = gql`
  mutation CreateDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;
