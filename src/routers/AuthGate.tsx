import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";

const AppRouter = React.lazy(() => import("./AppRouter"));
const AuthRouter = React.lazy(() => import("./AuthRouter"));

function AuthGate() {
  return (
    <Switch>
      <UnauthenticatedRoute path="/auth" component={AuthRouter} />
      <PrivateRoute path="/" component={AppRouter} />
    </Switch>
  );
}

export default AuthGate;
