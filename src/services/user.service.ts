import { useMutation } from "@apollo/client";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from "../__generated__/CreateAccountMutation";
import {
  LoginMutation,
  LoginMutationVariables,
} from "../__generated__/LoginMutation";
import { CREATE_ACCOUNT_MUTATION, LOGIN_MUTATION } from "./gqls/user.gql";

export const useLoginMutation = (
  onCompleted?: (data: LoginMutation) => void
) => {
  return useMutation<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION, {
    onCompleted: onCompleted ? onCompleted : undefined,
  });
};

export const useCreateAccountMutation = (
  onCompleted?: (data: CreateAccountMutation) => void
) => {
  return useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted: onCompleted ? onCompleted : undefined,
    }
  );
};
