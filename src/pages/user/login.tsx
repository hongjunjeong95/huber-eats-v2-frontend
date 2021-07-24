import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../services/user.service";
import {
  LoginMutation,
  LoginMutationVariables,
} from "../../__generated__/LoginMutation";
import { ILoginForm } from "../../interfaces";
import cooGetherLogo from "../../images/logo.png";
import { authTokenVar, isLoggedInVar } from "../../apollo";
import { LOCALSTORATE_AUTH_TOKEN } from "../../constants";
import { Button } from "../../components/button";

export const Login = () => {
  const { register, getValues, handleSubmit, formState } = useForm<ILoginForm>({
    mode: "onChange",
  });

  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORATE_AUTH_TOKEN, token);
      isLoggedInVar(true);
      authTokenVar(token);
    }
  };

  const [loginMutation, { data, error, loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center w-full">
      <div className="w-full max-w-screen-sm flex flex-col items-center justify-center px-5">
        <img src={cooGetherLogo} alt="Coogether Logo" className="w-64 mb-10" />
        <h1 className="w-full text-3xl font-medium mb-12 text-left">
          Welcome to Coogether
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full"
        >
          <input
            {...register("email", {
              required: "Email is required",
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            type="email"
            placeholder="Email"
            className="input"
          />
          <input
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            placeholder="Passowrd"
            className="input"
          />
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText="Login"
          />
        </form>
        <div className="mt-6">
          Are you new?
          <a href="" className="ml-2 text-lime-500">
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
};
