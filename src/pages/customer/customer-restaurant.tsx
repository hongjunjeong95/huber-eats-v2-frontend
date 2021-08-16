import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";

import CustomerDish from "../../components/customer-dish";
import { useFindRestaurantById } from "../../services/restaurant.service";

const CustomerRestaurant = memo(() => {
  const location = useLocation();
  const [, restaurantId] = location.search.split("?restaurantId=");
  const { data: restaurantData } = useFindRestaurantById(+restaurantId);

  return (
    <div>
      <Helmet>
        <title>
          {`${restaurantData?.findRestaurantById.restaurant?.name}`} | Huber
          Eats
        </title>
      </Helmet>
      <div
        style={{
          background: `url(${restaurantData?.findRestaurantById.restaurant?.coverImg})`,
        }}
        className="bg-gray-500 w-full bg-cover bg-center bg-no-repeat py-48"
      >
        <div className="bg-white xl:w-3/12 py-8 pl-48">
          <h2 className="text-4xl font-medium mb-3">
            {restaurantData?.findRestaurantById.restaurant?.name ||
              "Loading..."}
          </h2>
          <h5 className="text-sm font-light mb-2">
            {restaurantData?.findRestaurantById.restaurant?.category?.name}
          </h5>
          <h6 className="text-sm font-light">
            {restaurantData?.findRestaurantById.restaurant?.address}
          </h6>
        </div>
      </div>
      <div className="md:max-w-screen-xl w-full mx-auto mt-10 mb-40 min-h-screen">
        <div className="mt-16 grid md:grid-cols-3 auto-rows-440px gap-x-5 gap-y-20">
          {restaurantData?.findRestaurantById.restaurant?.menu?.map((dish) => (
            <CustomerDish
              key={Date.now() + dish.id}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              photo={dish.photo}
              restaurantId={restaurantId}
              dishId={dish.id + ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default CustomerRestaurant;
