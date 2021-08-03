import React, { memo } from "react";
import RestaurantCreateForm from "../../components/restaurantCreateForm";

const AddRestaurant = memo(() => {
  return (
    <div className="w-full flex justify-center">
      <div className="shadow-2xl border lg:w-1/3 py-10 flex max-h-screen flex-col justify-center items-center">
        <h4 className="font-semibold text-2xl mb-4">Add Restaurant</h4>
        <RestaurantCreateForm />
      </div>
    </div>
  );
});

export default AddRestaurant;
