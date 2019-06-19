import faker from "faker";
import { AxiosRequestConfig } from "axios";
import {
  ApiGetFirmwaresResponse,
  ApiPostFirmwareResponse,
  ApiPostFirmwareParams,
  ApiPutFirmwareResponse,
  ApiPutFirmwareParams,
  ApiDeleteFirmwareParams,
  ApiDeleteFirmwareResponse,
  ApiGetFirmwaresParams
} from "../../api";
import { StoreState } from "../../../states";
import firmwaresFixtures from "../../../fixtures/firmwares.json";
import { Firmware } from "../../../types/models";
import { ById } from "../../../types";
import { getModelIdFromRequest, generatePagination } from "./index";

const fimwaresById: ById<Firmware> = firmwaresFixtures;

export function getFirmwares(
  requestConfig: AxiosRequestConfig,
  _: StoreState
): ApiGetFirmwaresResponse {
  const {
    page = 1,
    size = 10,
    sort = undefined
  }: ApiGetFirmwaresParams = requestConfig.params;
  const firmwares = Object.keys(fimwaresById).map(id => fimwaresById[id]);
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
  const data: ApiPostFirmwareParams = JSON.parse(requestConfig.data);
  return {
    id,
    ...data,
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
  const data: ApiPutFirmwareParams = JSON.parse(requestConfig.data);
  const currentFirmware = store.cache.firmwares.byId[id];
  return {
    ...currentFirmware,
    ...data,
    modifiedDate: new Date().toISOString()
  };
}

export function deleteFirmware(
  requestConfig: AxiosRequestConfig,
  _: StoreState
): ApiDeleteFirmwareResponse {
  const params: ApiDeleteFirmwareParams = requestConfig.params;

  return params;
}
