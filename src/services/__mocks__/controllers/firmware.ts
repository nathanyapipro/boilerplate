import faker from "faker";
import { AxiosRequestConfig } from "axios";
import {
  ApiGetFirmwaresParams,
  ApiGetFirmwaresResponse,
  ApiPostFirmwareResponse,
  ApiPostFirmwareParams,
  ApiPutFirmwareResponse,
  ApiPutFirmwareParams,
  ApiDeleteFirmwareParams,
  ApiDeleteFirmwareResponse
} from "../../api";
import { StoreState } from "../../../states";
import firmwaresFixtures from "../../../fixtures/firmwares.json";
import deviceModelsFixtures from "../../../fixtures/deviceModels.json";
import { DeviceModel, Firmware, NestedFirmware } from "../../../types/models";
import { ById } from "../../../types";
import { getModelIdFromRequest, generatePagination } from "./index";

const firmwaresById: ById<Firmware> = firmwaresFixtures;
const deviceModelsById: ById<DeviceModel> = deviceModelsFixtures;

export function getFirmwares(
  requestConfig: AxiosRequestConfig,
  _: StoreState
): ApiGetFirmwaresResponse {
  const {
    page = 1,
    size = 10,
    sort = undefined
  }: ApiGetFirmwaresParams = requestConfig.params;
  const firmwares = Object.keys(firmwaresById).map(id => {
    const firmware = firmwaresById[id];
    return {
      ...firmware,
      models: firmware.models.map(id => deviceModelsById[id])
    } as NestedFirmware;
  });
  const pagination = generatePagination(firmwares, page, size, sort);
  const startIndex = (page - 1) * size;
  const list = firmwares.slice(startIndex, startIndex + size);
  return {
    ...pagination,
    list
  };
}

export function postFirmware(
  requestConfig: AxiosRequestConfig,
  store: StoreState
): ApiPostFirmwareResponse {
  const id = store.cache.firmwares.allIds.length + faker.random.number();
  const { models, ...data }: ApiPostFirmwareParams = JSON.parse(
    requestConfig.data
  );
  const deviceModels = models.map(id => deviceModelsById[id]);
  return {
    id,
    ...data,
    models: deviceModels,
    publishedDate: new Date().toISOString(),
    lastModifiedAdminId: 1,
    deleted: false,
    createdDate: new Date().toISOString(),
    modifiedDate: new Date().toISOString()
  };
}

export function putFirmware(
  requestConfig: AxiosRequestConfig,
  store: StoreState
): ApiPutFirmwareResponse {
  const id = getModelIdFromRequest(requestConfig);
  const { models, ...data }: ApiPutFirmwareParams = JSON.parse(
    requestConfig.data
  );
  if (models) {
    const currentFirmware = store.cache.firmwares.byId[id];
    const deviceModels = models.map(id => deviceModelsById[id]);
    return {
      ...currentFirmware,
      ...data,
      models: deviceModels,
      modifiedDate: new Date().toISOString()
    };
  } else {
    const currentFirmware = store.cache.firmwares.byId[id];
    const deviceModels = currentFirmware.models.map(id => deviceModelsById[id]);
    return {
      ...currentFirmware,
      ...data,
      models: deviceModels,
      modifiedDate: new Date().toISOString()
    };
  }
}

export function deleteFirmware(
  requestConfig: AxiosRequestConfig,
  _: StoreState
): ApiDeleteFirmwareResponse {
  const params: ApiDeleteFirmwareParams = requestConfig.params;

  return params;
}
