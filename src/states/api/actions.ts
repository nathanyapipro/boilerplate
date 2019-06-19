import { createAsyncAction } from "typesafe-actions";
import {
  ThunkActionCreator,
  StoreState,
  ThunkExtraArgument,
  Actions
} from "..";
import { actions as authActions } from "../auth/actions";
import * as Api from "../../services/api";
import { ThunkDispatch } from "redux-thunk";
import {
  setLocalStorageAuthCredentials,
  clearLocalStorageAuthCredentials
} from "../../helpers/auth";
import { validateBySchema } from "../../helpers/validators";
import ApiLoginResponseSchema from "../../schemas/api/ApiLoginResponse";
import ApiGetDeviceModelsResponseSchema from "../../schemas/api/ApiGetDeviceModelsResponse";
import ApiPostDeviceModelResponseSchema from "../../schemas/api/ApiPostDeviceModelResponse";
import ApiPutDeviceModelResponseSchema from "../../schemas/api/ApiPutDeviceModelResponse";
import ApiDeleteDeviceModelResponseSchema from "../../schemas/api/ApiDeleteDeviceModelResponse";
import ApiGetFirmwaresResponseSchema from "../../schemas/api/ApiGetFirmwaresResponse";
import ApiPostFirmwareResponseSchema from "../../schemas/api/ApiPostFirmwareResponse";
import ApiPutFirmwareResponseSchema from "../../schemas/api/ApiPutFirmwareResponse";
import ApiDeleteFirmwareResponseSchema from "../../schemas/api/ApiDeleteFirmwareResponse";
import { AxiosError } from "axios";
import { HasId } from "../../types";

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
  )<void, Api.ApiLogoutResponse, AxiosError>(),
  postFile: createAsyncAction(
    "api/POST_FILE_REQUEST",
    "api/POST_FILE_SUCCESS",
    "api/POST_FILE_FAILURE"
  )<void, Api.ApiPostFileResponse, AxiosError>(),
  getDeviceModels: createAsyncAction(
    "api/GET_DEVICE_MODELS_REQUEST",
    "api/GET_DEVICE_MODELS_SUCCESS",
    "api/GET_DEVICE_MODELS_FAILURE"
  )<void, Api.ApiGetDeviceModelsResponse, AxiosError>(),
  postDeviceModel: createAsyncAction(
    "api/POST_DEVICE_MODEL_REQUEST",
    "api/POST_DEVICE_MODEL_SUCCESS",
    "api/POST_DEVICE_MODEL_FAILURE"
  )<void, Api.ApiPostDeviceModelResponse, AxiosError>(),
  putDeviceModel: createAsyncAction(
    "api/PUT_DEVICE_MODEL_REQUEST",
    "api/PUT_DEVICE_MODEL_SUCCESS",
    "api/PUT_DEVICE_MODEL_FAILURE"
  )<void, Api.ApiPutDeviceModelResponse, AxiosError>(),
  deleteDeviceModel: createAsyncAction(
    "api/DELETE_DEVICE_MODEL_REQUEST",
    "api/DELETE_DEVICE_MODEL_SUCCESS",
    "api/DELETE_DEVICE_MODEL_FAILURE"
  )<void, Api.ApiDeleteDeviceModelResponse, AxiosError>(),
  getFirmwares: createAsyncAction(
    "api/GET_FIRMWARES_REQUEST",
    "api/GET_FIRMWARES_SUCCESS",
    "api/GET_FIRMWARES_FAILURE"
  )<void, Api.ApiGetFirmwaresResponse, AxiosError>(),
  postFirmware: createAsyncAction(
    "api/POST_FIRMWARE_REQUEST",
    "api/POST_FIRMWARE_SUCCESS",
    "api/POST_FIRMWARE_FAILURE"
  )<void, Api.ApiPostFirmwareResponse, AxiosError>(),
  putFirmware: createAsyncAction(
    "api/PUT_FIRMWARE_REQUEST",
    "api/PUT_FIRMWARE_SUCCESS",
    "api/PUT_FIRMWARE_FAILURE"
  )<void, Api.ApiPutFirmwareResponse, AxiosError>(),
  deleteFirmware: createAsyncAction(
    "api/DELETE_FIRMWARE_REQUEST",
    "api/DELETE_FIRMWARE_SUCCESS",
    "api/DELETE_FIRMWARE_FAILURE"
  )<void, Api.ApiDeleteFirmwareResponse, AxiosError>()
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

export const login: ThunkActionCreator<Api.ApiLoginParams> = (
  input: Api.ApiLoginParams
) => async (dispatch, _, { apiClient }) => {
  dispatch(actions.login.request());

  try {
    const response = await apiClient.login(input);
    validateBySchema(ApiLoginResponseSchema, response);
    setLocalStorageAuthCredentials(response);
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

export const getFirmwares: ThunkActionCreator<
  Api.ApiGetFirmwaresParams
> = input => async (dispatch, _, { apiClient }) => {
  dispatch(actions.getFirmwares.request());

  try {
    const response = await apiClient.getFirmwares(input);
    validateBySchema(ApiGetFirmwaresResponseSchema, response);
    dispatch(actions.getFirmwares.success(response));
  } catch (err) {
    dispatch(actions.getFirmwares.failure(err));
    handleInstanceOfHttpStatusUnauthorizedOrForbidden(dispatch, apiClient, err);
  }
};

export const postFirmware: ThunkActionCreator<
  Api.ApiPostFirmwareParams
> = input => async (dispatch, _, { apiClient }) => {
  dispatch(actions.postFirmware.request());

  try {
    const response = await apiClient.postFirmware(input);
    validateBySchema(ApiPostFirmwareResponseSchema, response);
    dispatch(actions.postFirmware.success(response));
  } catch (err) {
    dispatch(actions.postFirmware.failure(err));
    handleInstanceOfHttpStatusUnauthorizedOrForbidden(dispatch, apiClient, err);
  }
};

export const putFirmware: ThunkActionCreator<
  Api.ApiPutFirmwareParams & HasId
> = input => async (dispatch, _, { apiClient }) => {
  dispatch(actions.putFirmware.request());

  const { id, ...params } = input;

  try {
    const response = await apiClient.putFirmware(id, params);
    validateBySchema(ApiPutFirmwareResponseSchema, response);
    dispatch(actions.putFirmware.success(response));
  } catch (err) {
    dispatch(actions.putFirmware.failure(err));
    handleInstanceOfHttpStatusUnauthorizedOrForbidden(dispatch, apiClient, err);
  }
};

export const deleteFirmware: ThunkActionCreator<
  Api.ApiDeleteFirmwareParams
> = input => async (dispatch, _, { apiClient }) => {
  dispatch(actions.deleteFirmware.request());

  try {
    const response = await apiClient.deleteFirmware(input);
    validateBySchema(ApiDeleteFirmwareResponseSchema, response);
    dispatch(actions.deleteFirmware.success(response));
  } catch (err) {
    dispatch(actions.deleteFirmware.failure(err));
    handleInstanceOfHttpStatusUnauthorizedOrForbidden(dispatch, apiClient, err);
  }
};
