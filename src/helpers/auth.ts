import { AuthState } from "../states/auth/reducer";
import { validateBySchema } from "./validators";
import AuthStateCredentialsSchema from "../schemas/api/AuthStateCredentials";

const LOCAL_STORAGE_AUTH_KEY = "credentials";

export const clearLocalStorageAuthCredentials = () => {
	localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
};

export const getLocalStorageAuthCredentials = (): AuthState["credentials"] => {
	const serializedAuthState = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
	if (serializedAuthState) {
		try {
			const credentials = JSON.parse(serializedAuthState);
			validateBySchema(AuthStateCredentialsSchema, credentials);
			return credentials;
		} catch (e) {
			clearLocalStorageAuthCredentials();
		}
	}
};

export const setLocalStorageAuthCredentials = (
	localStorageState: AuthState["credentials"]
) => {
	localStorage.setItem(
		LOCAL_STORAGE_AUTH_KEY,
		JSON.stringify(localStorageState)
	);
};
