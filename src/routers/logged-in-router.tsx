import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import Wrapper from "../components/wraper";
import AddRestaurant from "../pages/owner/add-restaurant";
import MyRestaurants from "../pages/owner/my-restaurants";

export const LoggedInRouter = () => {
  return (
    <Router>
      <Header />
      <Wrapper>
        <Switch>
          <Route path="/" exact>
            <MyRestaurants />
          </Route>
          <Route path="/add-restaurant" exact>
            <AddRestaurant />
          </Route>
        </Switch>
      </Wrapper>
    </Router>
  );
};
