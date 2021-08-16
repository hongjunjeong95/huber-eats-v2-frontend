import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";

import Restaurant from "../../components/restaurant";
import { useGetAllRestaurants } from "../../services/restaurant.service";

const Restaurants = memo(() => {
  const location = useLocation();
  let [, page] = location.search.split("?page=");
  page = page ?? 1;
  const { data, loading } = useGetAllRestaurants(parseInt(page));

  return (
    <div className="max-w-screen-xl w-full mx-auto mt-32 mb-40 min-h-screen">
      <Helmet>
        <title>Restaurants | Huber Eats</title>
      </Helmet>
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-4xl font-medium">Retaurants</h2>
      </div>
      {loading ? (
        <div className="flex items-center justify-center font-bold text-center text-3xl">
          "Loading..."
        </div>
      ) : (
        <>
          {data?.getAllRestaurants.ok &&
          data?.getAllRestaurants.restaurants.length === 0 ? (
            <div className="flex flex-col">
              <span className="text-lg font-medium mb-4">
                There is no restaurants
              </span>
              <span className="font-me">Please add restaurants</span>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-x-6 gap-y-10">
              {data?.getAllRestaurants.restaurants.map((restaurant) => (
                <Restaurant
                  key={Date.now()}
                  id={restaurant.id}
                  name={restaurant.name}
                  addresss={restaurant.address}
                  categoryName={restaurant.category.name}
                  coverImg={restaurant.coverImg}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
});

export default Restaurants;
