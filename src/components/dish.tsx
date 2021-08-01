import React, { memo } from "react";

interface IDishProps {
  name: string;
  photo: string;
  description: string;
  price: number;
}

const Dish: React.FC<IDishProps> = memo(
  ({ name, description, photo, price }) => {
    return (
      <div>
        <img src={photo} alt="" />
        <div className="flex flex-col px-10 py-3 border-2">
          <h3 className="font-medium text-lg">{name}</h3>
          <span className="">{description}</span>
          <span className="mt-6">\{price}</span>
        </div>
      </div>
    );
  }
);

export default Dish;
