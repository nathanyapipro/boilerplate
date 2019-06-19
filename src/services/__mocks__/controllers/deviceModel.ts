import faker from "faker";
import { AxiosRequestConfig } from "axios";
import {
  ApiGetDeviceModelsParams,
  ApiGetDeviceModelsResponse,
  ApiPostDeviceModelResponse,
  ApiPostDeviceModelParams,
  ApiPutDeviceModelResponse,
  ApiPutDeviceModelParams,
  ApiDeleteDeviceModelParams,
  ApiDeleteDeviceModelResponse
} from "../../api";
import { StoreState } from "../../../states";
import deviceModelsFixtures from "../../../fixtures/deviceModels.json";
import { DeviceModel } from "../../../types/models";
import { ById } from "../../../types";
import { getModelIdFromRequest, generatePagination } from "./index";

const deviceModelsById: ById<DeviceModel> = deviceModelsFixtures;

export function getDeviceModels(
  requestConfig: AxiosRequestConfig,
  _: StoreState
): ApiGetDeviceModelsResponse {
  const {
    page = 1,
    size = 10,
    sort = undefined
  }: ApiGetDeviceModelsParams = requestConfig.params;
  const deviceModels = Object.keys(deviceModelsById).map(
    id => deviceModelsById[id]
  );
  const pagination = generatePagination(deviceModels, page, size, sort);
  const startIndex = (page - 1) * size;
  const list = deviceModels.slice(startIndex, startIndex + size);
  return {
    ...pagination,
    list
  };
}

export function postDeviceModel(
  requestConfig: AxiosRequestConfig,
  store: StoreState
): ApiPostDeviceModelResponse {
  const id = store.cache.deviceModels.allIds.length + faker.random.number();
  const data: ApiPostDeviceModelParams = JSON.parse(requestConfig.data);
  return {
    id,
    ...data,
    lastModifiedAdminId: 1,
    createdDate: new Date().toISOString(),
    modifiedDate: new Date().toISOString()
  };
}

export function putDeviceModel(
  requestConfig: AxiosRequestConfig,
  store: StoreState
): ApiPutDeviceModelResponse {
  const id = getModelIdFromRequest(requestConfig);
  const data: ApiPutDeviceModelParams = JSON.parse(requestConfig.data);
  const currentDeviceModel = store.cache.deviceModels.byId[id];
  return {
    ...currentDeviceModel,
    ...data,
    modifiedDate: new Date().toISOString()
  };
}

export function deleteDeviceModel(
  requestConfig: AxiosRequestConfig,
  _: StoreState
): ApiDeleteDeviceModelResponse {
  const params: ApiDeleteDeviceModelParams = requestConfig.params;

  return params;
}
