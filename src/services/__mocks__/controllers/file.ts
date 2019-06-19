import faker from "faker";
import { AxiosRequestConfig } from "axios";
import { ApiPostFileResponse } from "../../api";
import { StoreState } from "../../../states";

export function postFile(
  requestConfig: AxiosRequestConfig,
  store: StoreState
): ApiPostFileResponse {
  return {
    url: faker.image.imageUrl(400, 400)
  };
}
