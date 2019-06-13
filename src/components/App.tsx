import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import { Store } from "redux";
import { StylesProvider } from "@material-ui/styles";
import { Provider } from "react-redux";
import withTheme from "./withTheme";
import { StoreState } from "../states";
import { History } from "history";
import AuthGate from "../routers/AuthGate";
import Loading from "./Loading";
import { makeStyles } from "@material-ui/styles";
import SnackbarQueue from "./Snackbar";
import { Theme } from "@material-ui/core";

const useGlobalStyles = makeStyles((theme: Theme) => ({
  "@global": {
    html: {
      display: "flex",
      flex: 1,
      width: "100%",
      height: "100%"
    },
    body: {
      display: "flex",
      flex: 1
    },
    "#root": {
      display: "flex",
      flex: 1
    }
  }
}));

interface AppProps {
  store: Store<StoreState>;
  history: History;
}

type Props = AppProps;

function AppBase({ store, history }: Props) {
  useGlobalStyles();
  return (
    <StylesProvider>
      <Provider store={store}>
        <React.Suspense fallback={<Loading />}>
          <ConnectedRouter history={history}>
            <AuthGate />
            <SnackbarQueue />
          </ConnectedRouter>
        </React.Suspense>
      </Provider>
    </StylesProvider>
  );
}

const App = withTheme(AppBase);

export default App;
