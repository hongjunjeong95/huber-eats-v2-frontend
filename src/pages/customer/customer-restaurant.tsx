import React, { memo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

import CustomerDish from "../../components/customer-dish";
import { useCreateOrderMutation } from "../../services/order.service";
import { useFindRestaurantById } from "../../services/restaurant.service";
import { CreateOrderItemInput } from "../../__generated__/globalTypes";

const CustomerRestaurant = memo(() => {
  const [orderStarted, setOrderStarted] = useState<boolean>(false);
  const [items, setItems] = useState<CreateOrderItemInput[]>([]);

  const location = useLocation();
  const [, restaurantId] = location.search.split("?restaurantId=");
  const { data: restaurantData } = useFindRestaurantById(+restaurantId);
  const [createOrderMutation, { loading }] = useCreateOrderMutation();

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
  const a = {
    errors: [
      {
        message:
          'Variable "$input" got invalid value { restaurantId: 14, items: [[Object], [Object]] }; Field "name" of required type "String!" was not provided.',
        locations: [{ line: 1, column: 21 }],
        extensions: {
          code: "BAD_USER_INPUT",
          exception: {
            stacktrace: [
              'GraphQLError: Variable "$input" got invalid value { restaurantId: 14, items: [[Object], [Object]] }; Field "name" of required type "String!" was not provided.',
              "    at C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\values.js:116:15",
              "    at coerceInputValueImpl (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\utilities\\coerceInputValue.js:99:11)",
              "    at coerceInputValueImpl (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\utilities\\coerceInputValue.js:54:14)",
              "    at coerceInputValue (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\utilities\\coerceInputValue.js:37:10)",
              "    at _loop (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\values.js:109:69)",
              "    at coerceVariableValues (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\values.js:121:16)",
              "    at getVariableValues (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\values.js:50:19)",
              "    at buildExecutionContext (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\execute.js:203:61)",
              "    at executeImpl (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\execute.js:101:20)",
              "    at Object.execute (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\execute.js:60:35)",
            ],
          },
        },
      },
      {
        message:
          'Variable "$input" got invalid value { restaurantId: 14, items: [[Object], [Object]] }; Field "price" of required type "Int!" was not provided.',
        locations: [{ line: 1, column: 21 }],
        extensions: {
          code: "BAD_USER_INPUT",
          exception: {
            stacktrace: [
              'GraphQLError: Variable "$input" got invalid value { restaurantId: 14, items: [[Object], [Object]] }; Field "price" of required type "Int!" was not provided.',
              "    at C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\values.js:116:15",
              "    at coerceInputValueImpl (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\utilities\\coerceInputValue.js:99:11)",
              "    at coerceInputValueImpl (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\utilities\\coerceInputValue.js:54:14)",
              "    at coerceInputValue (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\utilities\\coerceInputValue.js:37:10)",
              "    at _loop (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\values.js:109:69)",
              "    at coerceVariableValues (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\values.js:121:16)",
              "    at getVariableValues (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\values.js:50:19)",
              "    at buildExecutionContext (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\execute.js:203:61)",
              "    at executeImpl (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\execute.js:101:20)",
              "    at Object.execute (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\execute.js:60:35)",
            ],
          },
        },
      },
      {
        message:
          'Variable "$input" got invalid value { restaurantId: 14, items: [[Object], [Object]] }; Field "photo" of required type "String!" was not provided.',
        locations: [{ line: 1, column: 21 }],
        extensions: {
          code: "BAD_USER_INPUT",
          exception: {
            stacktrace: [
              'GraphQLError: Variable "$input" got invalid value { restaurantId: 14, items: [[Object], [Object]] }; Field "photo" of required type "String!" was not provided.',
              "    at C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\values.js:116:15",
              "    at coerceInputValueImpl (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\utilities\\coerceInputValue.js:99:11)",
              "    at coerceInputValueImpl (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\utilities\\coerceInputValue.js:54:14)",
              "    at coerceInputValue (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\utilities\\coerceInputValue.js:37:10)",
              "    at _loop (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\values.js:109:69)",
              "    at coerceVariableValues (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\values.js:121:16)",
              "    at getVariableValues (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\values.js:50:19)",
              "    at buildExecutionContext (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\execute.js:203:61)",
              "    at executeImpl (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\execute.js:101:20)",
              "    at Object.execute (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\execute.js:60:35)",
            ],
          },
        },
      },
      {
        message:
          'Variable "$input" got invalid value { restaurantId: 14, items: [[Object], [Object]] }; Field "description" of required type "String!" was not provided.',
        locations: [{ line: 1, column: 21 }],
        extensions: {
          code: "BAD_USER_INPUT",
          exception: {
            stacktrace: [
              'GraphQLError: Variable "$input" got invalid value { restaurantId: 14, items: [[Object], [Object]] }; Field "description" of required type "String!" was not provided.',
              "    at C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\values.js:116:15",
              "    at coerceInputValueImpl (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\utilities\\coerceInputValue.js:99:11)",
              "    at coerceInputValueImpl (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\utilities\\coerceInputValue.js:54:14)",
              "    at coerceInputValue (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\utilities\\coerceInputValue.js:37:10)",
              "    at _loop (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\values.js:109:69)",
              "    at coerceVariableValues (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\values.js:121:16)",
              "    at getVariableValues (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\values.js:50:19)",
              "    at buildExecutionContext (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\execute.js:203:61)",
              "    at executeImpl (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\execute.js:101:20)",
              "    at Object.execute (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\execute.js:60:35)",
            ],
          },
        },
      },
      {
        message:
          'Variable "$input" got invalid value { restaurantId: 14, items: [[Object], [Object]] }; Field "items" is not defined by type "CreateDishInput".',
        locations: [{ line: 1, column: 21 }],
        extensions: {
          code: "BAD_USER_INPUT",
          exception: {
            stacktrace: [
              'GraphQLError: Variable "$input" got invalid value { restaurantId: 14, items: [[Object], [Object]] }; Field "items" is not defined by type "CreateDishInput".',
              "    at C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\values.js:116:15",
              "    at coerceInputValueImpl (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\utilities\\coerceInputValue.js:114:9)",
              "    at coerceInputValueImpl (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\utilities\\coerceInputValue.js:54:14)",
              "    at coerceInputValue (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\utilities\\coerceInputValue.js:37:10)",
              "    at _loop (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\values.js:109:69)",
              "    at coerceVariableValues (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\values.js:121:16)",
              "    at getVariableValues (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\values.js:50:19)",
              "    at buildExecutionContext (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\execute.js:203:61)",
              "    at executeImpl (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\execute.js:101:20)",
              "    at Object.execute (C:\\Disk ks\\Git\\nuber-eats\\huber-eats-v2\\huber-eats-v2-backend\\node_modules\\graphql\\execution\\execute.js:60:35)",
            ],
          },
        },
      },
    ],
  };

  const triggerConfirmOrder = () => {
    const ok = window.confirm("Do you want to order?");
    if (ok) {
      console.log(items);
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
          {restaurantData?.findRestaurantById.restaurant?.menu?.map((dish) => (
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
          ))}
        </div>
      </div>
    </div>
  );
});

export default CustomerRestaurant;
