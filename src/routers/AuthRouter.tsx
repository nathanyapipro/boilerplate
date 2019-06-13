import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

const Login = React.lazy(() => import("../pages/Login"));

function AuthRouter() {
	return (
		<AuthLayout>
			<Switch>
				<Route path="/auth/login" exact component={Login} />
				<Redirect from="/auth*" to="/auth/login" />
			</Switch>
		</AuthLayout>
	);
}

export default AuthRouter;
