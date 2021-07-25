import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MyRestaurants } from "../pages/owner/my-restaurants";

export const LoggedInRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <MyRestaurants />
        </Route>
      </Switch>
    </Router>
  );
};
