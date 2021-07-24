import { gql, useMutation } from "@apollo/client";
import {
  LoginMutation,
  LoginMutationVariables,
} from "../__generated__/LoginMutation";

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`;

export const useLoginMutation = (
  onCompleted?: (data: LoginMutation) => void
) => {
  return useMutation<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION, {
    onCompleted: onCompleted ? onCompleted : undefined,
  });
};
