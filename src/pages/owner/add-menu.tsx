import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import MenuAddForm from "../../components/menuAddForm";

const AddMenu = memo(() => {
  const location = useLocation();
  const [, restaurantId] = location.search.split("?restaurantId=");

  return (
    <div className="w-full flex justify-center min-h-screen pb-20">
      <Helmet>
        <title>Add Menu | Huber Eats</title>
      </Helmet>
      <div className="shadow-2xl border lg:w-1/3 py-10 flex min-h-screen flex-col justify-center items-center">
        <h4 className="font-semibold text-2xl mb-4">Add Menu</h4>
        <MenuAddForm />
        <button className="button bg-gray-400 mt-4 w-3/4">
          <Link to={`/myRestaurant?restaurantId=${restaurantId}`}>Back</Link>
        </button>
      </div>
    </div>
  );
});

export default AddMenu;
