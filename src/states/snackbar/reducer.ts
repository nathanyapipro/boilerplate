import { ActionType, getType } from "typesafe-actions";
import { actions as apiActions } from "../api/actions";
import { actions } from "./actions";
import { SnackbarMessage } from "../../components/Snackbar";
import { apiActionKeys } from "../api/reducer";
import { formatErrorMessage } from "../../helpers/api";

export type SnackbarState = Array<SnackbarMessage>;

const INITIAL_STATE: SnackbarState = [];

const apiFailureActions = apiActionKeys.map(key => apiActions[key].failure);

export function snackbar(
	state: SnackbarState = INITIAL_STATE,
	action: ActionType<typeof actions | typeof apiActions>
): SnackbarState {
	switch (action.type) {
		case getType(apiActions.login.failure): {
			return [
				...state,
				{
					variant: "error",
					message: formatErrorMessage(action.payload)
				}
			];
		}
		case getType(actions.addSnackbarQueueItem): {
			return [...state, action.payload];
		}
		case getType(actions.snackbarQueueItemProcessed): {
			return state.slice(1);
		}
		default:
			// All remaining api call failures return the default error message
			if (
				apiFailureActions.some(
					failureAction => getType(failureAction) === action.type
				)
			) {
				return [
					...state,
					{
						variant: "error",
						message: formatErrorMessage()
					}
				];
			}

			return state;
	}
}
