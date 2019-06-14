import { AxiosRequestConfig } from "axios";
import { ApiGetFirmwaresResponse } from "../../api";
import { StoreState } from "../../../states";
import firmwaresFixtures from "../../../fixtures/firmwares.json";
import { Firmware } from "../../../types/models";
import { ById } from "../../../types";

const fimwaresById: ById<Firmware> = firmwaresFixtures;

export function getFirmwares(
  requestConfig: AxiosRequestConfig,
  _: StoreState
): ApiGetFirmwaresResponse {
  return Object.keys(fimwaresById).map(id => fimwaresById[id]);
}
