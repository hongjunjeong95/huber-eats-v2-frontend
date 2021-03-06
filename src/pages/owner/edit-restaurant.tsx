import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import RestaurantEditForm from "../../components/restaurantEditForm";
import { useFindMyRestaurantById } from "../../services/restaurant.service";

const UpdateRestaurant = memo(() => {
  const location = useLocation();
  const [, restaurantId] = location.search.split("?restaurantId=");
  const { data: restaurantData, loading } = useFindMyRestaurantById(
    +restaurantId
  );

  return (
    <div className="w-full flex justify-center">
      <Helmet>
        <title>
          Edit {`${restaurantData?.findMyRestaurantById.restaurant?.name}`} |
          Huber Eats
        </title>
      </Helmet>
      <div className="shadow-2xl border lg:w-1/3 py-10 flex max-h-screen flex-col justify-center items-center">
        <h4 className="font-semibold text-2xl mb-4">Edit Restaurant</h4>
        {loading ? (
          "Loading..."
        ) : (
          <RestaurantEditForm
            formName={
              restaurantData?.findMyRestaurantById.restaurant?.name
                ? restaurantData?.findMyRestaurantById.restaurant?.name
                : ""
            }
            formAddress={
              restaurantData?.findMyRestaurantById.restaurant?.address
                ? restaurantData?.findMyRestaurantById.restaurant?.address
                : ""
            }
            formCategoryName={
              restaurantData?.findMyRestaurantById.restaurant?.category.name
                ? restaurantData?.findMyRestaurantById.restaurant?.category.name
                : ""
            }
            formCoverImg={
              restaurantData?.findMyRestaurantById.restaurant?.coverImg
                ? restaurantData?.findMyRestaurantById.restaurant?.coverImg
                : ""
            }
            restaurantId={restaurantId}
          />
        )}
        <button className="button bg-gray-400 mt-4 w-3/4">
          <Link to={`/myRestaurant?restaurantId=${restaurantId}`}>Back</Link>
        </button>
      </div>
    </div>
  );
});

export default UpdateRestaurant;
