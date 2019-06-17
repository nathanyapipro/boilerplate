import * as React from "react";
import { Switch, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

const Home = React.lazy(() => import("../pages/Home"));
const DeviceFirmware = React.lazy(() => import("../pages/DeviceFirmware"));

function AppRouter() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/cms/devices" exact component={Home} />
        <Route path="/cms/pods" exact component={Home} />
        <Route path="/cms/oils" exact component={Home} />
        <Route path="/cms/farmers" exact component={Home} />
        <Route path="/fms/device" exact component={DeviceFirmware} />
        <Route path="/mts/afm" exact component={Home} />
        <Route path="/mts/devices" exact component={Home} />
        <Route path="/mts/pods" exact component={Home} />
        <Route path="/fts/:id" exact component={Home} />
      </Switch>
    </AppLayout>
  );
}

export default AppRouter;
