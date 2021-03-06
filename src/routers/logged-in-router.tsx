import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Header } from "../components/header";
import Wrapper from "../components/wraper";
import Order from "../pages/common/order";
import CustomerRestaurant from "../pages/customer/customer-restaurant";
import Restaurants from "../pages/customer/restaurants";
import DeliverDashboard from "../pages/driver/dashboard";
import AddMenu from "../pages/owner/add-menu";
import AddMenuOption from "../pages/owner/add-menu-option";
import AddRestaurant from "../pages/owner/add-restaurant";
import EditMenu from "../pages/owner/edit-menu";
import UpdateRestaurant from "../pages/owner/edit-restaurant";
import MyRestaurant from "../pages/owner/my-restaurant";
import MyRestaurants from "../pages/owner/my-restaurants";
import EditProfile from "../pages/user/edit-profile";
import { useMeQuery } from "../services/user.service";
import { UserRole } from "../__generated__/globalTypes";

const ownerRoutes = [
  { path: "/", component: <MyRestaurants /> },
  { path: "/restaurant", component: <MyRestaurant /> },
  { path: "/add-restaurant", component: <AddRestaurant /> },
  { path: "/edit-restaurant", component: <UpdateRestaurant /> },
  { path: "/add-menu", component: <AddMenu /> },
  { path: "/add-menu-options", component: <AddMenuOption /> },
  { path: "/edit-menu", component: <EditMenu /> },
];

const customerRoutes = [
  { path: "/", component: <Restaurants /> },
  { path: "/restaurant", component: <CustomerRestaurant /> },
];

const deliverRoutes = [{ path: "/", component: <DeliverDashboard /> }];

const commonRoutes = [
  { path: "/edit-profile", component: <EditProfile /> },
  { path: "/order", component: <Order /> },
];

export const LoggedInRouter = () => {
  const { data } = useMeQuery();
  return (
    <Router>
      <Header />
      <Wrapper>
        <Switch>
          {data?.me.role === UserRole.Owner &&
            ownerRoutes.map((ownerRoute) => (
              <Route key={ownerRoute.path} path={ownerRoute.path} exact>
                {ownerRoute.component}
              </Route>
            ))}
          {data?.me.role === UserRole.Client &&
            customerRoutes.map((customerRoute) => (
              <Route key={customerRoute.path} path={customerRoute.path} exact>
                {customerRoute.component}
              </Route>
            ))}
          {data?.me.role === UserRole.Deliver &&
            deliverRoutes.map((deliverRoute) => (
              <Route key={deliverRoute.path} path={deliverRoute.path} exact>
                {deliverRoute.component}
              </Route>
            ))}
          {commonRoutes.map((commonRoute) => (
            <Route key={commonRoute.path} path={commonRoute.path} exact>
              {commonRoute.component}
            </Route>
          ))}
        </Switch>
      </Wrapper>
    </Router>
  );
};
