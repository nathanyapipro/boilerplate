import { ActionType, getType } from "typesafe-actions";
import { actions } from "../api/actions";
import { combineReducers, Reducer, ReducersMapObject } from "redux";
import { AxiosError } from "axios";

export enum RequestStatus {
  NONE = "NONE",
  FETCHING = "FETCHING",
  FAILURE = "FAILURE",
  SUCCESS = "SUCCESS"
}

export type ApiCall = {
  status: RequestStatus;
  error?: AxiosError | Error;
};

const apiCallInit: ApiCall = {
  status: RequestStatus.NONE
};

type AsyncAction = ActionType<typeof actions>;
type AsyncActionReducer = Reducer<ApiCall, ActionType<typeof actions>>;
type AsyncActionKey = keyof typeof actions;

export type ApiState = Record<AsyncActionKey, ApiCall>;

export const apiActionKeys = Object.keys(actions) as Array<AsyncActionKey>;

const asyncActionReducer = (key: AsyncActionKey): AsyncActionReducer => {
  return (state: ApiCall = apiCallInit, action: AsyncAction) => {
    switch (action.type) {
      case getType(actions[key].request):
        return {
          status: RequestStatus.FETCHING
        };
      case getType(actions[key].success):
        return {
          status: RequestStatus.SUCCESS
        };
      case getType(actions[key].failure):
        return {
          status: RequestStatus.FAILURE,
          error: action.payload
        };
      default:
        return state;
    }
  };
};

const asyncReducers: ReducersMapObject = apiActionKeys.reduce((acc, key) => {
  return {
    ...acc,
    [key]: asyncActionReducer(key)
  };
}, {});

export const api: Reducer<ApiState, AsyncAction> = combineReducers(
  asyncReducers
);
