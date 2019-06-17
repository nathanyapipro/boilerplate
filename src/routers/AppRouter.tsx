import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

const Home = React.lazy(() => import("../pages/Home"));

function AppRouter() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/cms/devices" exact component={Home} />
        <Redirect to="/cms/devices" />
      </Switch>
    </AppLayout>
  );
}

export default AppRouter;
