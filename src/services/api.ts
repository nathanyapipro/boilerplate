import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";
import * as retryAxios from "retry-axios";
import { User } from "../types/models";
import { HttpStatusCode } from "../helpers/http";
import { getLocalStorageAuthUuid } from "../helpers/auth";
import sha1 from "sha1";

export interface ApiLoginParams {
  email: string;
  password: string;
}

export interface ApiLoginResponse extends User {}

export type ApiLogoutResponse = undefined;

interface AxiosResponseError extends AxiosError {
  response: AxiosError["response"];
}

interface AxiosRequestError extends AxiosError {
  request: AxiosError["request"];
}

const REQUEST_TIMEOUT = 1000000;

export function createAxiosInstance(backendUrl: string): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: backendUrl,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });

  retryAxios.attach(axiosInstance);

  return axiosInstance;
}

export function instanceOfAxiosResponseError(
  err?: Error
): err is AxiosResponseError {
  return Boolean(
    err && err.hasOwnProperty("config") && err.hasOwnProperty("response")
  );
}

export function instanceOfAxiosRequestError(
  err?: Error
): err is AxiosRequestError {
  return Boolean(
    err && err.hasOwnProperty("config") && err.hasOwnProperty("request")
  );
}

export function instanceOfHttpStatusUnauthorized(err?: Error): boolean {
  return Boolean(
    instanceOfAxiosResponseError(err) &&
      err.response &&
      err.response.status === HttpStatusCode.UNAUTHORIZED
  );
}

export function instanceOfHttpStatusForbidden(err?: Error): boolean {
  return Boolean(
    instanceOfAxiosResponseError(err) &&
      err.response &&
      err.response.status === HttpStatusCode.FORBIDDEN
  );
}

export class ApiClient {
  axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  setAuthorizationHeader(token: string) {
    this.axiosInstance.defaults.headers.common.Authorization = token;
  }

  removeAuthorizationHeader() {
    this.axiosInstance.defaults.headers.common.Authorization = undefined;
  }

  getConfig(): AxiosRequestConfig {
    const plateformKey = "cf053c9deaed22f035261bde50c1d6e8";
    const uuid = getLocalStorageAuthUuid();
    if (!uuid) {
      return {};
    }
    const time = Math.floor(+new Date() / 1000) + "";
    const arr = [plateformKey, time, uuid];
    const temp = arr.sort().join("");
    const apiKey = sha1(temp);

    return {
      headers: {
        apiKey: apiKey,
        time: time,
        uuid: uuid,
        version: "cms1"
      }
    };
  }

  async login(params: ApiLoginParams): Promise<ApiLoginResponse> {
    const url = `/cms/account/login`;
    const config = this.getConfig();
    console.log(config);
    const response = await this.axiosInstance.post<ApiLoginResponse>(
      url,
      JSON.stringify(params),
      config
    );
    const { appToken } = response.data;
    this.setAuthorizationHeader(appToken);
    return response.data;
  }

  async logout(): Promise<ApiLogoutResponse> {
    const url = `/v1/logout`;
    const response = await this.axiosInstance.post<ApiLogoutResponse>(url);
    this.removeAuthorizationHeader();
    return response.data;
  }
}
