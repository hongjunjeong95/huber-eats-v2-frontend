import { gql } from "@apollo/client";
import React, { memo } from "react";
import { Link } from "react-router-dom";

import { client } from "../apollo";
import { DeleteDish } from "../__generated__/DeleteDish";

interface IDishProps {
  name: string;
  photo: string;
  description: string;
  price: number;
  restaurantId: string;
  dishId: number;
  orderStarted: boolean;
  isSelected: boolean;
  addItemToOrder: (dishId: number) => void;
  removeFromOrder: (dishId: number) => void;
}

const CustomerDish: React.FC<IDishProps> = memo(
  ({
    name,
    description,
    photo,
    price,
    restaurantId,
    dishId,
    orderStarted,
    isSelected,
    addItemToOrder,
    removeFromOrder,
  }) => {
    const slicedDescription =
      description.length > 50
        ? `${description.substring(0, 50)}...`
        : description;

    const onClick = () => {
      if (orderStarted) {
        if (!isSelected && addItemToOrder) {
          addItemToOrder(dishId);
        } else if (isSelected && removeFromOrder) {
          removeFromOrder(dishId);
        }
      }
    };

    return (
      <div
        className={`border pb-10 cursor-pointer transition-all ${
          isSelected ? "border-gray-800" : " hover:border-gray-800"
        }`}
      >
        <img src={photo} alt="" className="w-full h-2/3" />
        <div className="flex px-10 py-3">
          <div className="flex flex-col">
            <div className="mb-4 flex items-center">
              <h3 className="font-medium text-lg">{name}</h3>
              <div>
                {orderStarted && (
                  <button
                    className={`ml-4 button text-sm py-1 px-2 ${
                      isSelected ? "bg-red-500" : "bg-lime-500"
                    }`}
                    onClick={onClick}
                  >
                    {isSelected ? "Remove" : "Add"}
                  </button>
                )}
              </div>
            </div>
            <div className="h-14">{slicedDescription}</div>
            <span className="mt-3">\{price}</span>
          </div>
        </div>
      </div>
    );
  }
);

export default CustomerDish;
