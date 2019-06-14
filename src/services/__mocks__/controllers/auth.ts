// import * as faker from "faker";
import usersById from "../../../fixtures/users.json";
import { AxiosRequestConfig } from "axios";
import { ApiLoginResponse, ApiLoginParams, ApiLogoutResponse } from "../../api";
import { User } from "../../../types/models.js";

export function login(requestConfig: AxiosRequestConfig): ApiLoginResponse {
  const users = Object.values(usersById);
  const data: ApiLoginParams = JSON.parse(requestConfig.data);
  const user: User =
    users.find(user => user.email === data.email) || usersById[1];

  return {
    ...user
  };
}

export function logout(): ApiLogoutResponse {
  return;
}
