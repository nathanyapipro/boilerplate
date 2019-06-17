import faker from "faker";
import { AxiosRequestConfig } from "axios";
import {
  ApiGetFirmwaresResponse,
  ApiPostFirmwareResponse,
  ApiPostFirmwareParams,
  ApiPutFirmwareResponse,
  ApiPutFirmwareParams
} from "../../api";
import { StoreState } from "../../../states";
import firmwaresFixtures from "../../../fixtures/firmwares.json";
import { Firmware } from "../../../types/models";
import { ById } from "../../../types";
import { getModelIdFromRequest } from "./index";

const fimwaresById: ById<Firmware> = firmwaresFixtures;

export function getFirmwares(
  requestConfig: AxiosRequestConfig,
  _: StoreState
): ApiGetFirmwaresResponse {
  return Object.keys(fimwaresById).map(id => fimwaresById[id]);
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
