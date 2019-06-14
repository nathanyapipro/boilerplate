import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
  StoreEnhancer
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { ActionType } from "typesafe-actions";
import { cache, CacheState } from "./cache/reducer";
import { global, GlobalState } from "./global/reducer";
import { auth, AuthState } from "./auth/reducer";
import { api, ApiState } from "./api/reducer";
import { snackbar, SnackbarState } from "./snackbar/reducer";
import { actions as authActions } from "./auth/actions";
import { actions as apiActions } from "./api/actions";
import { actions as broadcastChannelActions } from "./broadcastChannel/actions";
import { actions as snackbarActions } from "./snackbar/actions";
import * as Api from "../services/api";
import { History, createBrowserHistory } from "history";
import { createBroadcastChannel } from "../services/broadcastChannel";
import {
  connectRouter,
  RouterState,
  routerMiddleware,
  CallHistoryMethodAction
} from "connected-react-router";
import {
  getLocalStorageAuthCredentials,
  getLocalStorageAuthUuid,
  setLocalStorageAuthUuid
} from "../helpers/auth";
import { createBroadcastChannelMiddleware } from "./broadcastChannel/middleware";
import { ResizeObserver } from "../types/resizeObserver";
import uuidv1 from "uuid/v1";

declare global {
  interface Window {
    env: { [key: string]: string };
    BroadcastChannel?: BroadcastChannel;
    ResizeObserver?: ResizeObserver;
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "localhost:8080";

export type Actions = ActionType<
  | typeof authActions
  | typeof apiActions
  | typeof broadcastChannelActions
  | typeof snackbarActions
  | CallHistoryMethodAction
>;

export interface ThunkExtraArgument {
  apiClient: Api.ApiClient;
}

type ThunkResult<R> = ThunkAction<R, StoreState, ThunkExtraArgument, Actions>;

export type ThunkActionCreator<P = void, R = void> = (
  params: P
) => ThunkResult<R>;

export interface StoreState {
  router: RouterState;
  global: GlobalState;
  auth: AuthState;
  cache: CacheState;
  api: ApiState;
  snackbar: SnackbarState;
}

interface InitStore {
  store: Store<StoreState>;
  history: History;
}

const publicURL = process.env.PUBLIC_URL;

export async function initStore(): Promise<InitStore> {
  const broadcastChannel = createBroadcastChannel();
  const axiosInstance = await Api.createAxiosInstance(BACKEND_URL);
  const apiClient = new Api.ApiClient(axiosInstance);
  const history = createBrowserHistory({
    basename: publicURL
  });

  const enhancers: Array<StoreEnhancer> = [];
  const middlewares = [
    routerMiddleware(history),
    thunk.withExtraArgument({ apiClient })
  ];

  if (broadcastChannel) {
    middlewares.push(createBroadcastChannelMiddleware(broadcastChannel));
  }

  if (
    process.env.NODE_ENV !== "production" &&
    window.__REDUX_DEVTOOLS_EXTENSION__
  ) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const store = createStore(
    combineReducers({
      router: connectRouter(history),
      global,
      auth,
      cache,
      api,
      snackbar
    }),
    {
      global: {
        backendUrl: BACKEND_URL
      }
    },
    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  );

  if (
    process.env.NODE_ENV !== "production" &&
    process.env.REACT_APP_API_MOCK_ENABLED === "true"
  ) {
    const mockApiModule = await import("../services/__mocks__/api");
    mockApiModule.mockAxios(axiosInstance, store);
  }

  const credentials = getLocalStorageAuthCredentials();
  if (credentials && credentials.appToken) {
    apiClient.setAuthorizationHeader(credentials.appToken);
  }

  const uuid = getLocalStorageAuthUuid();
  if (!uuid) {
    setLocalStorageAuthUuid(uuidv1());
  }

  return {
    store,
    history
  };
}
