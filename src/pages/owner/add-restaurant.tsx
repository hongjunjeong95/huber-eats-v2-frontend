import React, { memo } from "react";
import { Button } from "../../components/button";

const AddRestaurant = memo(() => {
  return (
    <div className="w-full flex justify-center">
      <div className="shadow-2xl border w-1/3 py-10 flex max-h-screen flex-col justify-center items-center">
        <h4 className="font-semibold text-2xl mb-4">Add Restaurant</h4>
        <form className="flex flex-col w-3/4">
          <input
            className="input"
            type="text"
            name="name"
            placeholder="Restaurant Name"
          />
          <input
            className="input"
            type="text"
            name="address"
            placeholder="Restaurant Address"
          />
          <input
            className="input"
            type="text"
            name="category"
            placeholder="Restaurant Category"
          />
          <input className="input" type="file" name="coverImage" />
          <Button canClick={false} actionText="Add Restaurant" loading={true} />
        </form>
      </div>
    </div>
  );
});

export default AddRestaurant;
