import faker from "faker";
import { AxiosRequestConfig } from "axios";
import { ApiPostFileImageResponse } from "../../api";
import { ApiPostFileFirmwareResponse } from "../../api";
import { StoreState } from "../../../states";

export function postFileImage(
  requestConfig: AxiosRequestConfig,
  store: StoreState
): ApiPostFileImageResponse {
  return {
    url: faker.image.imageUrl(400, 400)
  };
}

export function postFileFirmware(
  requestConfig: AxiosRequestConfig,
  store: StoreState
): ApiPostFileFirmwareResponse {
  return {
    url: faker.internet.url()
  };
}
