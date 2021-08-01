import { memo } from "react";
import { Link } from "react-router-dom";
import Restaurant from "../../components/restaurant";
import { useGetMyRestaurants } from "../../services/restaurant.service";

const MyRestaurants = memo(() => {
  const { data, loading } = useGetMyRestaurants();
  return (
    <div className="max-w-screen-xl w-full mx-auto mt-32 mb-40 min-h-screen">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-4xl font-medium">My Retaurants</h2>
        <Link
          to="/add-restaurant"
          className="font-medium bg-green-400 rounded-lg py-2 px-4 text-white shadow-inner"
        >
          Add restaurant
        </Link>
      </div>
      {loading ? (
        "Loading..."
      ) : (
        <>
          {data?.getMyRestaurants.ok &&
          data.getMyRestaurants.restaurants.length === 0 ? (
            <div className="flex flex-col">
              <span className="text-lg font-medium mb-4">
                There is no restaurants
              </span>
              <span className="font-me">Please add restaurants</span>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-x-6 gap-y-10">
              {data?.getMyRestaurants.restaurants.map((restaurant) => (
                <Restaurant
                  key={Date.now()}
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

export default MyRestaurants;
