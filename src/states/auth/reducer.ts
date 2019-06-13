import { ActionType, getType } from "typesafe-actions";
import { User } from "../../types/models";
import { actions } from "./actions";
import { actions as apiActions } from "../api/actions";
import { getLocalStorageAuthCredentials } from "../../helpers/auth";

interface AuthStateCredentials {
	accessToken: string;
	user: User;
}

export interface AuthState {
	credentials?: AuthStateCredentials;
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
			const { accessToken, user } = action.payload;

			return {
				...state,
				credentials: {
					accessToken: accessToken,
					user
				}
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
