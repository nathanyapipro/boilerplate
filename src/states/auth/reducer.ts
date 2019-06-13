import { ActionType, getType } from "typesafe-actions";
import { User } from "../../types/models";
import { actions } from "./actions";
import { actions as apiActions } from "../api/actions";
import { getLocalStorageAuthCredentials } from "../../helpers/auth";

interface AuthStateCredentials extends User {}

export interface AuthState {
  credentials?: AuthStateCredentials;
  uuid?: string;
}

const INITIAL_STATE = {
  credentials: getLocalStorageAuthCredentials()
};

export function auth(
  state: AuthState = INITIAL_STATE,
  action: ActionType<typeof actions | typeof apiActions>
): AuthState {
  switch (action.type) {
    case getType(apiActions.login.success):
      return {
        ...state,
        credentials: action.payload
      };
    case getType(apiActions.logout.success):
      return {
        ...state,
        credentials: undefined
      };
    case getType(actions.apiRequestUnauthorized):
      return {
        ...state,
        credentials: undefined
      };
    default:
      return state;
  }
}
