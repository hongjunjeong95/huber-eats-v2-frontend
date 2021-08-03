import React, { memo } from "react";
import { Link } from "react-router-dom";

interface IRestaurantProps {
  name: string;
  addresss: string;
  categoryName: string;
  coverImg: string;
  id: number;
}

const Restaurant: React.FC<IRestaurantProps> = memo(
  ({ name, addresss, categoryName, coverImg, id }) => {
    return (
      <Link to={`myRestaurant?restaurantId=${id}`}>
        <div className="flex flex-col">
          <img src={coverImg} alt="" className="max-h-64" />
          <h3 className="text-xl mt-2">{name}</h3>
          <div className="border-t mt-2 py-2 text-xs opacity-50 border-gray-400 flex">
            <span className="mr-2 pr-2 border-r-2 border-gray-400">
              {categoryName}
            </span>
            <span className="">{addresss}</span>
          </div>
        </div>
      </Link>
    );
  }
);

export default Restaurant;
