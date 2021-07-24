import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export const LoggedInRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div>Restaurants</div>
        </Route>
      </Switch>
    </Router>
  );
};
