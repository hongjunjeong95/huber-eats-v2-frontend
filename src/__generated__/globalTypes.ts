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

export interface CreateOrderInput {
  restaurantId: number;
  items: CreateOrderItemInput[];
}

export interface CreateOrderItemInput {
  dishId: number;
  options?: OrderItemOptionInputType[] | null;
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

export interface DeleteRestaurantInput {
  id: number;
}

export interface DishChoiceInputType {
  name: string;
  extra?: number | null;
}

export interface DishOptionInputType {
  name: string;
  choices?: DishChoiceInputType[] | null;
}

export interface EditProfileInput {
  email?: string | null;
  password?: string | null;
}

export interface EditRestaurantInput {
  name?: string | null;
  coverImg?: string | null;
  address?: string | null;
  categoryName?: string | null;
  restaurantId: number;
}

export interface FindDishInput {
  id: number;
  restaurantId: number;
}

export interface FindMyRestaurantByIdInput {
  id: number;
}

export interface FindRestaurantByIdInput {
  id: number;
}

export interface GetAllRestaurantsInput {
  page?: number | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface OrderItemOptionInputType {
  name: string;
  choice?: string | null;
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
