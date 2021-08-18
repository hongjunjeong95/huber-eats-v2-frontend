import React, { memo, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { ORDER_UPDATED_SUBSCRIPTION } from "../../services/gqls/order.gql";

import {
  useFindOrderQuery,
  useUpdateOrderStatusMutation,
} from "../../services/order.service";
import { useMeQuery } from "../../services/user.service";
import { OrderStatus, UserRole } from "../../__generated__/globalTypes";
import { OrderUpdated } from "../../__generated__/OrderUpdated";

const Order = memo(() => {
  const location = useLocation();
  const [, orderId] = location.search.split("?orderId=");

  const { data: userData } = useMeQuery();
  const { data, subscribeToMore } = useFindOrderQuery(+orderId);

  useEffect(() => {
    if (data?.findOrder.ok) {
      subscribeToMore({
        document: ORDER_UPDATED_SUBSCRIPTION,
        variables: {
          input: {
            id: +orderId,
          },
        },
        updateQuery: (
          prev,
          {
            subscriptionData: { data },
          }: { subscriptionData: { data: OrderUpdated } }
        ) => {
          if (!data) return prev;
          return {
            findOrder: {
              ...prev.findOrder,
              order: {
                ...data.orderUpdated,
              },
            },
          };
        },
      });
    }
  }, [data, subscribeToMore, orderId]);

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const onButtonClick = (newStatus: OrderStatus) => {
    updateOrderStatus({
      variables: {
        input: {
          orderId: +orderId,
          status: newStatus,
        },
      },
    });
  };

  return (
    <div className="flex justify-center items-center">
      <Helmet>
        <title>Order #{orderId} | Huber Eats</title>
      </Helmet>
      <div className="border border-gray-800 w-full max-w-screen-sm flex flex-col justify-center">
        <h2 className="bg-gray-800 w-full py-5 text-white text-center text-xl">
          Order #{orderId}
        </h2>
        <span className="p-5 pt-10 text-3xl text-center ">
          ${data?.findOrder.order?.total}
        </span>
        <div className="p-5 text-xl grid gap-6">
          <div className="border-t pt-5 border-gray-700">
            Restaurant :{" "}
            <span className="font-medium">
              {data?.findOrder.order?.restaurant?.name}
            </span>
          </div>
          <div className="border-t pt-5 border-gray-700 ">
            Customer :{" "}
            <span className="font-medium">
              {data?.findOrder.order?.customer?.email}
            </span>
          </div>
          <div className="border-t border-b py-5 border-gray-700">
            Deliver :{" "}
            <span className="font-medium">
              {data?.findOrder.order?.deliver?.email ?? "Deliver is not yet"}
            </span>
          </div>
        </div>
        {userData?.me.role === UserRole.Client && (
          <span className="text-center mt-5 mb-3 text-2xl text-lime-600">
            Order Status : {data?.findOrder.order?.status}
          </span>
        )}
        {userData?.me.role === UserRole.Owner && (
          <>
            {data?.findOrder.order?.status === OrderStatus.Pending && (
              <button
                onClick={() => onButtonClick(OrderStatus.Cooking)}
                className="button m-5 bg-lime-500 mt-5 mb-3 text-2xl text-white"
              >
                Order Accepted
              </button>
            )}

            {data?.findOrder.order?.status !== OrderStatus.Cooking &&
              data?.findOrder.order?.status !== OrderStatus.Pending && (
                <span className="text-center mt-5 mb-3 text-2xl text-lime-600">
                  Order Status: {data?.findOrder.order?.status}
                </span>
              )}
          </>
        )}
      </div>
    </div>
  );
});

export default Order;
