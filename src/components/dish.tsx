import React, { memo } from "react";
import { Link } from "react-router-dom";

interface IDishProps {
  name: string;
  photo: string;
  description: string;
  price: number;
  restaurantId: string;
  dishId: string;
}

const Dish: React.FC<IDishProps> = memo(
  ({ name, description, photo, price, restaurantId, dishId }) => {
    return (
      <div>
        <img src={photo} alt="" />
        <div className="flex px-10 py-3 border-2">
          <div className="flex flex-col">
            <h3 className="font-medium text-lg">{name}</h3>
            <span className="">{description}</span>
            <span className="mt-6">\{price}</span>
          </div>
          <div>
            <Link
              to={`/edit-menu?restaurantId=${restaurantId}&dishId=${dishId}`}
              className={`ml-4 button bg-lime-500 text-sm py-1 px-2 mt-2`}
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    );
  }
);

export default Dish;
