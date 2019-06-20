import faker from "faker";
import { AxiosRequestConfig } from "axios";
import { ApiPostFileImageResponse } from "../../api";
import { StoreState } from "../../../states";

export function postFileImageImage(
  requestConfig: AxiosRequestConfig,
  store: StoreState
): ApiPostFileImageResponse {
  return {
    url: faker.image.imageUrl(400, 400)
  };
}
