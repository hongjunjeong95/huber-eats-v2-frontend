import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import Wrapper from "../components/wraper";
import AddMenu from "../pages/owner/add-menu";
import AddRestaurant from "../pages/owner/add-restaurant";
import MyRestaurant from "../pages/owner/my-restaurant";
import MyRestaurants from "../pages/owner/my-restaurants";

const ownerRoutes = [
  { path: "/", component: <MyRestaurants /> },
  { path: "/add-restaurant", component: <AddRestaurant /> },
  { path: "/myRestaurant", component: <MyRestaurant /> },
  { path: "/add-menu", component: <AddMenu /> },
];

export const LoggedInRouter = () => {
  return (
    <Router>
      <Header />
      <Wrapper>
        <Switch>
          {ownerRoutes.map((ownerRoute) => (
            <Route key={ownerRoute.path} path={ownerRoute.path} exact>
              {ownerRoute.component}
            </Route>
          ))}
        </Switch>
      </Wrapper>
    </Router>
  );
};
