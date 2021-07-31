import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import Wrapper from "../components/wraper";
import { MyRestaurants } from "../pages/owner/my-restaurants";

export const LoggedInRouter = () => {
  return (
    <Router>
      <Header />
      <Wrapper>
        <Switch>
          <Route path="/" exact>
            <MyRestaurants />
          </Route>
        </Switch>
      </Wrapper>
    </Router>
  );
};
