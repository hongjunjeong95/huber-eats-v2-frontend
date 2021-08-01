/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Client = "Client",
  Deliver = "Deliver",
  Owner = "Owner",
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface CreateDishInput {
  name: string;
  price: number;
  photo: string;
  description: string;
  restaurantId: number;
}

export interface CreateRestaurantInput {
  name: string;
  coverImg: string;
  address: string;
  categoryName: string;
}

export interface FindMyRestaurantByIdInput {
  id: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
