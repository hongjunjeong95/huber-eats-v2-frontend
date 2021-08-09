import React from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../services/user.service";
import { LoginMutation } from "../../__generated__/LoginMutation";
import cooGetherLogo from "../../images/logo.png";
import { authTokenVar, isLoggedInVar } from "../../apollo";
import { LOCALSTORATE_AUTH_TOKEN } from "../../constants";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
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
  const [loginMutation, { loading, data: loginMutationData }] =
    useLoginMutation(onCompleted);

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center w-full">
      <Helmet>
        <title>Login | Huber Eats</title>
      </Helmet>
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
          {errors.email?.type === "pattern" && (
            <FormError errorMessage="Please enter email" />
          )}
          {errors.email?.message && (
            <FormError errorMessage={errors.email.message} />
          )}
          <input
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            placeholder="Passowrd"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password.message} />
          )}
          <Button canClick={isValid} loading={loading} actionText="Login" />
          {loginMutationData?.login.error && (
            <FormError errorMessage={loginMutationData?.login.error} />
          )}
        </form>
        <div className="mt-6">
          Are you new?
          <Link to="/create-account" className="ml-2 text-lime-500">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};
