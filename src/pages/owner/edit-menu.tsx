import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import MenuEditForm from "../../components/menuEditForm";
import { useFindDishQuery } from "../../services/dish.service";

const EditMenu = memo(() => {
  const location = useLocation();
  const [, queryParams] = location.search.split("?restaurantId=");
  let [restaurantId, dishId] = queryParams.split("&dishId=");

  const useFindDishQueryArgs = {
    dishId: +dishId,
    restaurantId: +restaurantId,
  };
  const { data: dishData, loading } = useFindDishQuery(useFindDishQueryArgs);

  return (
    <div className="w-full flex justify-center min-h-screen pb-20">
      <Helmet>
        <title>Edit Menu | Huber Eats</title>
      </Helmet>
      <div className="shadow-2xl border lg:w-1/3 py-10 flex max-h-screen flex-col justify-center items-center">
        <h4 className="font-semibold text-2xl mb-4">Edit Menu</h4>
        {loading ? (
          "Loading..."
        ) : (
          <MenuEditForm
            formName={
              dishData?.findDish.dish?.name ? dishData?.findDish.dish?.name : ""
            }
            formPrice={
              dishData?.findDish.dish?.price
                ? dishData?.findDish.dish?.price
                : 0
            }
            formDescription={
              dishData?.findDish.dish?.description
                ? dishData?.findDish.dish?.description
                : ""
            }
            formDishImg={
              dishData?.findDish.dish?.photo
                ? dishData?.findDish.dish?.photo
                : ""
            }
            restaurantId={restaurantId}
            dishId={dishId}
          />
        )}

        <button className="button bg-gray-400 mt-4 w-3/4">
          <Link to={`/myRestaurant?restaurantId=${restaurantId}`}>Back</Link>
        </button>
      </div>
    </div>
  );
});

export default EditMenu;
