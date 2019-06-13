import { AuthState } from "../states/auth/reducer";
import { validateBySchema } from "./validators";
import AuthStateCredentialsSchema from "../schemas/api/AuthStateCredentials";

const LOCAL_STORAGE_CREDENTIALS_KEY = "credentials";

export const clearLocalStorageAuthCredentials = () => {
  localStorage.removeItem(LOCAL_STORAGE_CREDENTIALS_KEY);
};

export const getLocalStorageAuthCredentials = (): AuthState["credentials"] => {
  const serializedAuthState = localStorage.getItem(
    LOCAL_STORAGE_CREDENTIALS_KEY
  );
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
    LOCAL_STORAGE_CREDENTIALS_KEY,
    JSON.stringify(localStorageState)
  );
};

const LOCAL_STORAGE_UUID_KEY = "uuid";

export const clearLocalStorageAuthUuid = () => {
  localStorage.removeItem(LOCAL_STORAGE_UUID_KEY);
};

export const getLocalStorageAuthUuid = (): string | undefined => {
  const serializedAuthState = localStorage.getItem(LOCAL_STORAGE_UUID_KEY);
  if (serializedAuthState) {
    try {
      const uuid = JSON.parse(serializedAuthState);
      return uuid;
    } catch (e) {
      clearLocalStorageAuthUuid();
    }
  }
};

export const setLocalStorageAuthUuid = (localStorageState: string) => {
  localStorage.setItem(
    LOCAL_STORAGE_UUID_KEY,
    JSON.stringify(localStorageState)
  );
};
