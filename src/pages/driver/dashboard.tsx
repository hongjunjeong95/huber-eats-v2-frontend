import React from "react";
import { useHistory } from "react-router-dom";

import {
  useCookedOrderSubscription,
  useTakeOrderByDeliverMutation,
} from "../../services/order.service";
import { TakeOrderByDeliver } from "../../__generated__/TakeOrderByDeliver";

const DeliverDashboard = () => {
  const history = useHistory();

  const { data: cookedOrderSubscriptionData } = useCookedOrderSubscription();
  const onCompleted = (data: TakeOrderByDeliver) => {
    if (data.takeOrderByDeliver.ok) {
      history.push(
        `/order?orderId=${cookedOrderSubscriptionData?.cookedOrder.id}`
      );
    }
  };
  const [takeOrderMutation] = useTakeOrderByDeliverMutation(onCompleted);

  const triggerTakeOrder = (orderId: number) => {
    takeOrderMutation({
      variables: {
        input: {
          orderId,
        },
      },
    });
  };

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
            <button
              onClick={() =>
                triggerTakeOrder(cookedOrderSubscriptionData?.cookedOrder.id)
              }
              className="button m-5 w-full bg-lime-500 mt-5 mb-3 text-2xl text-white"
            >
              Take Order &rarr;
            </button>
          </>
        ) : (
          <h1 className="text-center  text-3xl font-medium">Order not yet</h1>
        )}
      </div>
    </div>
  );
};

export default DeliverDashboard;
