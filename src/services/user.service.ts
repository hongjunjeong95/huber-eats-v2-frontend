import { useMutation, useQuery } from "@apollo/client";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from "../__generated__/CreateAccountMutation";
import {
  EditProfileMutation,
  EditProfileMutationVariables,
} from "../__generated__/EditProfileMutation";
import {
  LoginMutation,
  LoginMutationVariables,
} from "../__generated__/LoginMutation";
import { Me } from "../__generated__/Me";
import {
  CREATE_ACCOUNT_MUTATION,
  EDIT_PROFILE_MUTATION,
  LOGIN_MUTATION,
  ME_QUERY,
} from "./gqls/user.gql";

export const useMeQuery = () => useQuery<Me>(ME_QUERY);

export const useLoginMutation = (onCompleted?: (data: LoginMutation) => void) =>
  useMutation<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION, {
    onCompleted: onCompleted ? onCompleted : undefined,
  });

export const useCreateAccountMutation = (
  onCompleted?: (data: CreateAccountMutation) => void
) =>
  useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted: onCompleted ? onCompleted : undefined,
    }
  );

export const useEditProfileMutation = (
  onCompleted?: (data: EditProfileMutation) => void
) =>
  useMutation<EditProfileMutation, EditProfileMutationVariables>(
    EDIT_PROFILE_MUTATION,
    {
      onCompleted: onCompleted ? onCompleted : undefined,
    }
  );
