import React, { memo } from "react";
import { useLocation } from "react-router-dom";
import { useFindMyRestaurantById } from "../../services/restaurant.service";

const MyRestaurant = memo(() => {
  const location = useLocation();
  const [_, restaurantId] = location.search.split("?restaurantId=");
  const { data } = useFindMyRestaurantById(+restaurantId);
  return (
    <div>
      <div
        style={{
          background: `url(${data?.findMyRestaurantById.restaurant?.coverImg})`,
        }}
        className="bg-gray-500 h-80 w-full bg-cover bg-center bg-no-repeat"
      ></div>
      <div className="max-w-screen-xl w-full mx-auto mt-10 mb-40 min-h-screen">
        <div className="flex flex-col mb-10">
          <h2 className="text-4xl font-medium mb-10">
            {data?.findMyRestaurantById.restaurant?.name || "Loading..."}
          </h2>
          <div className="mb-10">
            <button className="button">Add a dish</button>
          </div>
          <div className="grid grid-cols-3 gap-x-5 gap-y-10">
            {data?.findMyRestaurantById.restaurant?.menu?.map((dish) => (
              <div
                key={Date.now()}
                className="flex flex-col border-2 px-10 py-3"
              >
                <h3 className="font-medium text-lg">{dish.name}</h3>
                <span className="">{dish.description}</span>
                <span className="mt-6">\{dish.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default MyRestaurant;