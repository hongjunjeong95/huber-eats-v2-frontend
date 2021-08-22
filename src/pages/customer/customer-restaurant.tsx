import React, { memo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";

import CustomerDish from "../../components/customer-dish";
import { useCreateOrderMutation } from "../../services/order.service";
import { useFindRestaurantById } from "../../services/restaurant.service";
import { CreateOrder } from "../../__generated__/CreateOrder";
import { CreateOrderItemInput } from "../../__generated__/globalTypes";

const CustomerRestaurant = memo(() => {
  const [orderStarted, setOrderStarted] = useState<boolean>(false);
  const [items, setItems] = useState<CreateOrderItemInput[]>([]);

  const location = useLocation();
  const [, restaurantId] = location.search.split("?restaurantId=");
  const { data: restaurantData } = useFindRestaurantById(+restaurantId);

  const onCompleted = (data: CreateOrder) => {
    const {
      createOrder: { ok, orderId },
    } = data;
    if (ok) {
      history.push(`/order?orderId=${orderId}`);
    }
  };

  const [createOrderMutation] = useCreateOrderMutation(onCompleted);
  const history = useHistory();

  const triggerStartOrder = () => {
    setOrderStarted(true);
  };

  const triggerCancelOrder = () => {
    setOrderStarted(false);
    setItems([]);
  };

  const getItem = (dishId: number) => {
    return items.find((item) => item.dishId === dishId);
  };

  const isSelected = (dishId: number) => {
    return Boolean(getItem(dishId));
  };

  const addItemToOrder = (dishId: number) => {
    if (isSelected(dishId)) {
      return;
    }
    setItems((current) => [{ dishId, options: [] }, ...current]);
  };

  const removeFromOrder = (dishId: number) => {
    if (isSelected(dishId)) {
      setItems((current) => current.filter((dish) => dish.dishId !== dishId));
    }
  };

  const triggerConfirmOrder = () => {
    const ok = window.confirm("Do you want to order?");
    if (ok) {
      createOrderMutation({
        variables: {
          input: {
            restaurantId: +restaurantId,
            items,
          },
        },
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>
          {`${restaurantData?.findRestaurantById.restaurant?.name}`} | Huber
          Eats
        </title>
      </Helmet>
      <div
        style={{
          background: `url(${restaurantData?.findRestaurantById.restaurant?.coverImg})`,
        }}
        className="bg-gray-500 w-full bg-cover bg-center bg-no-repeat py-48"
      >
        <div className="bg-white xl:w-3/12 py-8 pl-48">
          <h2 className="text-4xl font-medium mb-3">
            {restaurantData?.findRestaurantById.restaurant?.name ||
              "Loading..."}
          </h2>
          <h5 className="text-sm font-light mb-2">
            {restaurantData?.findRestaurantById.restaurant?.category?.name}
          </h5>
          <h6 className="text-sm font-light">
            {restaurantData?.findRestaurantById.restaurant?.address}
          </h6>
        </div>
      </div>
      <div className="md:max-w-screen-xl w-full mx-auto mt-10 mb-40 min-h-screen">
        {!orderStarted ? (
          <button
            className="button bg-lime-500 py-2 px-4"
            onClick={triggerStartOrder}
          >
            Start Order
          </button>
        ) : (
          <div className="flex items-center">
            <button
              className="button bg-lime-500 py-2 px-4 mr-3"
              onClick={triggerConfirmOrder}
            >
              Confirm Order
            </button>
            <button
              onClick={triggerCancelOrder}
              className="button bg-black py-2 px-4"
            >
              Cancel Order
            </button>
          </div>
        )}

        <div className="mt-16 grid md:grid-cols-3 auto-rows-440px gap-x-5 gap-y-20">
          {restaurantData?.findRestaurantById.restaurant?.menu?.map(
            (dish: any) => (
              <CustomerDish
                key={Date.now() + dish.id}
                name={dish.name}
                description={dish.description}
                price={dish.price}
                photo={dish.photo}
                restaurantId={restaurantId}
                dishId={dish.id}
                orderStarted={orderStarted}
                isSelected={isSelected(dish.id)}
                addItemToOrder={addItemToOrder}
                removeFromOrder={removeFromOrder}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
});

export default CustomerRestaurant;
