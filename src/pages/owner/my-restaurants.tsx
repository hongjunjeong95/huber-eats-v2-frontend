import { memo } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/header";
import { useGetMyRestaurants } from "../../services/restaurant.service";

const MyRestaurants = memo(() => {
  const { data, loading } = useGetMyRestaurants();
  return (
    <div className="max-w-screen-xl w-full mx-auto mt-32">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-4xl font-medium">My Retaurants</h2>
        <Link
          to="/add-restaurant"
          className="font-medium bg-green-400 rounded-lg py-2 px-4 text-white shadow-inner"
        >
          Add restaurant
        </Link>
      </div>
      {data?.getMyRestaurants.ok &&
      data.getMyRestaurants.restaurants.length === 0 ? (
        <div>
          <h4>There is no restaurants</h4>
          <span>Please add restaurants</span>
        </div>
      ) : (
        <div className="grid grid-cols-3">
          {data?.getMyRestaurants.restaurants.map((restaurant) => (
            <div key={Date.now()} className="flex flex-col">
              <img src={restaurant.coverImg} alt="" />
              <h3 className="text-xl">{restaurant.name}</h3>
              <span className="border-t mt-2 py-2 text-xs opacity-50 border-gray-400">
                {restaurant.category.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default MyRestaurants;
