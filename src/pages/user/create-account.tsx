import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import * as Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

import { useCreateAccountMutation } from "../../services/user.service";
import cooGetherLogo from "../../images/logo.png";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { CreateAccountMutation } from "../../__generated__/CreateAccountMutation";
import { UserRole } from "../../__generated__/globalTypes";

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const validationSchema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string()
      .min(8)
      .message("Password must be longer thatn 8")
      .pattern(
        new RegExp(
          /(?=.*[!@#$%^&\*\(\)_\+\-=\[\]\{\};\':\"\\\|,\.<>\/\?]+)(?=.*[a-zA-Z]+)(?=.*\d+)/
        )
      )
      .message("Password must contain special character, string and number"),
  });
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICreateAccountForm>({
    mode: "onChange",
    resolver: joiResolver(validationSchema),
  });
  const history = useHistory();

  const onCompleted = (data: CreateAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      alert("Your account is created. Please login!");
      history.push("/");
    }
  };
  const [createACcountMutation, { loading, data: createAccountMutationData }] =
    useCreateAccountMutation(onCompleted);

  const onSubmit = () => {
    if (!loading) {
      const { email, password, role } = getValues();
      createACcountMutation({
        variables: {
          input: {
            email,
            password,
            role,
          },
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <Helmet>
        <title>Create account | Huber Eats</title>
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

          <select {...register("role")} className="input">
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>

          <Button
            canClick={isValid}
            loading={loading}
            actionText="Create Account"
          />
          {createAccountMutationData?.createAccount.error && (
            <FormError
              errorMessage={createAccountMutationData?.createAccount.error}
            />
          )}
        </form>
        <div className="mt-6">
          You have already account?
          <Link to="/" className="ml-2 text-lime-500">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
