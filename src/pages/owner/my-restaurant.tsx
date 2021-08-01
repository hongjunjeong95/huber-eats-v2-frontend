import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import Dish from "../../components/dish";
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
            <button className="button bg-green-400">
              <Link to={`/add-menu?restaurantId=${restaurantId}`}>
                Add a dish
              </Link>
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.findMyRestaurantById.restaurant?.menu?.map((dish) => (
              <Dish
                key={Date.now()}
                name={dish.name}
                description={dish.description}
                price={dish.price}
                photo={dish.photo}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default MyRestaurant;
