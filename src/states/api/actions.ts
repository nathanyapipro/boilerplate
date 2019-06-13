import { createAsyncAction } from "typesafe-actions";
import {
	ThunkActionCreator,
	StoreState,
	ThunkExtraArgument,
	Actions
} from "..";
import { actions as authActions } from "../auth/actions";
import * as Api from "../../services/api";
import ApiLoginResponseSchema from "../../schemas/api/ApiLoginResponse";
import { ThunkDispatch } from "redux-thunk";
import {
	setLocalStorageAuthCredentials,
	clearLocalStorageAuthCredentials
} from "../../helpers/auth";
import { validateBySchema } from "../../helpers/validators";
// import { push } from "connected-react-router";
import { AxiosError } from "axios";

export const actions = {
	login: createAsyncAction(
		"api/LOGIN_REQUEST",
		"api/LOGIN_SUCCESS",
		"api/LOGIN_FAILURE"
	)<void, Api.ApiLoginResponse, AxiosError>(),
	logout: createAsyncAction(
		"api/LOGOUT_REQUEST",
		"api/LOGOUT_SUCCESS",
		"api/LOGOUT_FAILURE"
	)<void, Api.ApiLogoutResponse, AxiosError>()
};

function handleInstanceOfHttpStatusUnauthorizedOrForbidden(
	dispatch: ThunkDispatch<StoreState, ThunkExtraArgument, Actions>,
	apiClient: Api.ApiClient,
	err?: AxiosError
) {
	if (
		Api.instanceOfHttpStatusUnauthorized(err) ||
		Api.instanceOfHttpStatusForbidden(err)
	) {
		apiClient.removeAuthorizationHeader();
		clearLocalStorageAuthCredentials();
		dispatch(authActions.apiRequestUnauthorized());
	}
}

export const login: ThunkActionCreator<Api.ApiLoginParams> = input => async (
	dispatch,
	_,
	{ apiClient }
) => {
	dispatch(actions.login.request());

	try {
		const response = await apiClient.login(input);
		validateBySchema(ApiLoginResponseSchema, response);
		setLocalStorageAuthCredentials({
			accessToken: response.accessToken,
			user: response.user
		});
		dispatch(actions.login.success(response));
	} catch (err) {
		dispatch(actions.login.failure(err));
		handleInstanceOfHttpStatusUnauthorizedOrForbidden(dispatch, apiClient, err);
	}
};

export const logout: ThunkActionCreator = () => async (
	dispatch,
	_,
	{ apiClient }
) => {
	dispatch(actions.logout.request());

	try {
		await apiClient.logout();
	} catch (err) {
		dispatch(actions.logout.failure(err));
	}
	clearLocalStorageAuthCredentials();
	dispatch(actions.logout.success());
};
