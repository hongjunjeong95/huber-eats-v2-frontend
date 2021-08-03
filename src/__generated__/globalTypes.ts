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
  options?: DishOptionInputType[] | null;
  restaurantId: number;
}

export interface CreateRestaurantInput {
  name: string;
  coverImg: string;
  address: string;
  categoryName: string;
}

export interface DeleteDishInput {
  id: number;
  restaurantId: number;
}

export interface DishChoiceInputType {
  name: string;
  extra?: number | null;
}

export interface DishOptionInputType {
  name: string;
  choices?: DishChoiceInputType[] | null;
}

export interface FindDishInput {
  id: number;
  restaurantId: number;
}

export interface FindMyRestaurantByIdInput {
  id: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UpdateDishInput {
  id?: number | null;
  name?: string | null;
  price?: number | null;
  photo?: string | null;
  description?: string | null;
  restaurantId: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
