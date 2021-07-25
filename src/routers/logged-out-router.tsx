import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CreateAccount } from "../pages/user/create-account";
import { Login } from "../pages/user/login";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/create-account" exact>
          <CreateAccount />
        </Route>
      </Switch>
    </Router>
  );
};
