import React, { memo } from "react";

interface IRestaurantProps {
  name: string;
  addresss: string;
  categoryName: string;
  coverImg: string;
}

const Restaurant: React.FC<IRestaurantProps> = memo(
  ({ name, addresss, categoryName, coverImg }) => {
    return (
      <div className="flex flex-col">
        <img src={coverImg} alt="" />
        <h3 className="text-xl mt-2">{name}</h3>
        <div className="border-t mt-2 py-2 text-xs opacity-50 border-gray-400 flex">
          <span className="mr-2 pr-2 border-r-2 border-gray-400">
            {categoryName}
          </span>
          <span className="">{addresss}</span>
        </div>
      </div>
    );
  }
);

export default Restaurant;
