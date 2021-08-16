import React from "react";
import { Button } from "../../components/button";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { gql } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import * as Joi from "joi";

import { FormError } from "../../components/form-error";
import {
  useEditProfileMutation,
  useMeQuery,
} from "../../services/user.service";
import { EditProfileMutation } from "../../__generated__/EditProfileMutation";
import { client } from "../../apollo";

interface IEditProfileForm {
  email: string;
  password: string;
}

const EditProfile = () => {
  const { data: userData } = useMeQuery();
  const history = useHistory();
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
  } = useForm<IEditProfileForm>({
    mode: "onChange",
    defaultValues: {
      email: userData?.me.email,
    },
    resolver: joiResolver(validationSchema),
  });

  const onCompleted = (data: EditProfileMutation) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok && userData) {
      const {
        me: { email: prevEmail, id },
      } = userData;
      const { email: newEmail } = getValues();
      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditedUser on User {
              email
            }
          `,
          data: {
            email: newEmail,
          },
        });
      }
      history.push("/");
    }
  };

  const [editProfileMutation, { data: editProfileData, loading }] =
    useEditProfileMutation(onCompleted);

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      editProfileMutation({
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
    <div className="min-h-screen flex items-center justify-center w-full">
      <Helmet>
        <title>{`Edit ${userData?.me.email}`} | Huber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center justify-center px-5">
        <h1 className="font-bold text-2xl mb-10">Edit Profile</h1>
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
            {...register("password")}
            type="password"
            placeholder="Passowrd"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password.message} />
          )}

          <Button
            canClick={isValid}
            loading={loading}
            actionText="Edit Profile"
          />
          {editProfileData?.editProfile.error && (
            <FormError errorMessage={editProfileData?.editProfile.error} />
          )}
        </form>
        <button className="button bg-gray-400 mt-4 w-full">
          <Link to="/">Back</Link>
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
