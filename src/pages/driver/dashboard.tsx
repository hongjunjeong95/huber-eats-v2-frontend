import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { useHistory } from "react-router-dom";

import {
  useCookedOrderSubscription,
  useTakeOrderByDeliverMutation,
} from "../../services/order.service";
import { TakeOrderByDeliver } from "../../__generated__/TakeOrderByDeliver";

interface ICoords {
  lat: number;
  lng: number;
}

interface IDriverProps {
  lat: number;
  lng: number;
  $hover?: any;
}

const Driver: React.FC<IDriverProps> = ({ lat, lng }) => (
  // @ts-ignore
  <div lat={lat} lng={lng} className="text-lg">
    🚖
  </div>
);

const DeliverDashboard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({ lng: 0, lat: 0 });
  const [map, setMap] = useState<google.maps.Map>();
  const [maps, setMaps] = useState<any>();

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

  // @ts-ignore
  const onSucces = ({ coords: { latitude, longitude } }: Position) => {
    setDriverCoords({ lat: latitude, lng: longitude });
  };
  // @ts-ignore
  const onError = (error: PositionError) => {
    console.log(error);
  };
  // 나의 위치를 가져온다.
  useEffect(() => {
    navigator.geolocation.watchPosition(onSucces, onError, {
      enableHighAccuracy: true,
    });
  }, []);
  // 나의 위치가 변경되면 지도에 반영한다.
  useEffect(() => {
    if (map && maps) {
      map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
    }
  }, [driverCoords.lat, driverCoords.lng, map, maps]);
  const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
    setMap(map); // map은 지금 당장 내가 가지고 있는 지도 정보다. react component다.

    // maps는 내가 사용할 수 있는 Google maps 객체다. map을 위한 constructor다.
    // 하지만 google.maps를 사용하면 state로 관리할 필요가 없다.
    setMaps(maps);
  };
  // 나의 위치와 목적지의 route를 만든다.
  const makeRoute = () => {
    console.log(driverCoords);
    if (map) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: "#88def3",
          strokeOpacity: 0.8,
          strokeWeight: 5,
        },
      });
      directionsRenderer.setMap(map);
      directionsService.route(
        {
          // Driver 위치
          origin: {
            location: new google.maps.LatLng(
              driverCoords.lat,
              driverCoords.lng
            ),
          },

          // 가게 위치
          destination: {
            location: new google.maps.LatLng(
              // @ts-ignore
              driverCoords.lat + 1,

              // @ts-ignore
              driverCoords.lng + 1
            ),
          },
          travelMode: google.maps.TravelMode.TRANSIT,
        },
        (result) => {
          directionsRenderer.setDirections(result);
        }
      );
    }
  };

  useEffect(() => {
    if (cookedOrderSubscriptionData?.cookedOrder.id) {
      makeRoute();
    }
  }, [cookedOrderSubscriptionData, makeRoute]);

  return (
    <div>
      <div
        className="overflow-hidden"
        style={{ width: window.innerWidth, height: "50vh" }}
      >
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onApiLoaded}
          defaultZoom={16}
          draggable={true}
          defaultCenter={{
            lat: 36.58,
            lng: 125.95,
          }}
          bootstrapURLKeys={{ key: "AIzaSyBLZJ_q29e0X4CuGwO8VLDtIpW6Icbz7uQ" }}
        >
          <Driver lat={driverCoords.lat} lng={driverCoords.lng} />
        </GoogleMapReact>
      </div>
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
