import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "../pages/user/login";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};
