import React from "react";
import { memo } from "react";
import { useCookedOrderSubscription } from "../../services/order.service";

const DeliverDashboard = memo(() => {
  const { data: cookedOrderSubscriptionData } = useCookedOrderSubscription();

  return (
    <div>
      <div className="max-w-screen-sm mx-auto bg-white relative -top-10 shadow-lg py-8 px-5">
        {cookedOrderSubscriptionData?.cookedOrder.restaurant ? (
          <>
            <h1 className="text-center text-3xl font-medium">New Order</h1>
            <h1 className="text-center my-3 text-2xl font-medium">
              Pick up @ {""}
              {cookedOrderSubscriptionData?.cookedOrder.restaurant?.name}
            </h1>
            <button className="button m-5 w-full bg-lime-500 mt-5 mb-3 text-2xl text-white">
              Take Order &rarr;
            </button>
          </>
        ) : (
          <h1 className="text-center  text-3xl font-medium">Order not yet</h1>
        )}
      </div>
    </div>
  );
});

export default DeliverDashboard;
