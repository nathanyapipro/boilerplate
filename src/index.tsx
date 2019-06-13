import React from "react";
import { render } from "react-dom";
import { initStore } from "./states";
// import { initSentry } from "./services/sentry";
import * as serviceWorker from "./serviceWorker";

// initSentry();

(async function() {
	const { store, history } = await initStore();
	const appModule = await import("./components/App");
	const App = appModule.default;

	render(
		<App store={store} history={history} />,
		document.getElementById("root")
	);
})();

serviceWorker.unregister();
