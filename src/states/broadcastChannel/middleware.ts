import { Middleware, MiddlewareAPI, Action, Dispatch } from "redux";
import { actions } from "./actions";
import { StoreState } from "..";
import { ActionType, getType } from "typesafe-actions";
import {
  ReduxBroadcastChannel,
  ReduxMessageEvent
} from "../../services/broadcastChannel";

function createDispatch(store: MiddlewareAPI<Dispatch, StoreState>) {
  return (action: Action) => () => {
    const { dispatch } = store;
    return dispatch(action);
  };
}

function createBroadcastChannelActionDispatcher(
  store: MiddlewareAPI<Dispatch, StoreState>,
  broadcastChannel: ReduxBroadcastChannel
) {
  const dispatch = createDispatch(store);
  broadcastChannel.onmessage = (ev: ReduxMessageEvent) => {
    const action = ev.data;
    dispatch(action)();
  };
}

function createBroadcastChannelEventEmitter(
  broadcastChannel: ReduxBroadcastChannel
) {
  return (action: ActionType<typeof actions>) => {
    switch (action.type) {
      case getType(actions.close): {
        broadcastChannel.close();
        break;
      }
      case getType(actions.postMessage): {
        broadcastChannel.postMessage(action.payload);
        break;
      }
      // no default
    }
  };
}

export function createBroadcastChannelMiddleware(
  broadcastChannel: ReduxBroadcastChannel
): Middleware {
  return store => {
    createBroadcastChannelActionDispatcher(store, broadcastChannel);
    const broadcastChannelEventEmitter = createBroadcastChannelEventEmitter(
      broadcastChannel
    );

    return next => action => {
      broadcastChannelEventEmitter(action);
      return next(action);
    };
  };
}
