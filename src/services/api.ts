import axios, {
  AxiosInstance,
  AxiosError
  // AxiosRequestConfig
} from "axios";
import * as retryAxios from "retry-axios";
import { User, Firmware } from "../types/models";
import { HttpStatusCode } from "../helpers/http";
import { getLocalStorageAuthUuid } from "../helpers/auth";
import sha1 from "sha1";
import "whatwg-fetch";

interface DeleteParams {
  ids: number[];
}

export interface ApiLoginParams {
  email: string;
  password: string;
  uuid: string;
}

export type ApiLoginResponse = User;

export type ApiLogoutResponse = undefined;

export type ApiGetFirmwaresResponse = Firmware[];

export type ApiPostFirmwareParams = Omit<
  Firmware,
  "id" | "createdDate" | "modifiedDate" | "lastModifiedAdminId" | "deleted"
>;

export type ApiPostFirmwareResponse = Firmware;

export type ApiPutFirmwareParams = Omit<
  Firmware,
  | "id"
  | "createdDate"
  | "modifiedDate"
  | "lastModifiedAdminId"
  | "deleted"
  | "url"
>;

export type ApiPutFirmwareResponse = Firmware;

export type ApiDeleteFirmwareParams = { ids: number[] };

export type ApiDeleteFirmwareResponse = { ids: number[] };

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

export interface HttpResponse<T> extends Response {
  parsedBody: T;
}

export class ApiClient {
  axiosInstance: AxiosInstance;
  token?: string;
  urlBase: string;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
    this.urlBase = process.env.REACT_APP_BACKEND_URL || "localhost:8080";
  }

  setAuthorizationHeader(token: string) {
    this.token = token;
  }

  removeAuthorizationHeader() {
    this.token = undefined;
  }

  getConfig(): any {
    const plateformKey = "3bf76fce64167acb7a67dcf696a0ba34";
    const uuid = getLocalStorageAuthUuid();
    const time = Math.floor(+new Date() / 1000) + "";
    const arr = [plateformKey, time, uuid];
    const temp = arr.sort().join("");
    const apiKey = sha1(temp);

    return {
      headers: {
        Authorization: this.token,
        "Accept-Language": "en",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "x-airgraft-apiKey": apiKey,
        "x-airgraft-time": time,
        "x-airgraft-uuid": uuid,
        "x-airgraft-version": "cms1"
      }
    };
  }

  async login(params: ApiLoginParams): Promise<ApiLoginResponse> {
    const url = `/cms/account/login`;
    const config = this.getConfig();
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
    const url = `/cms/account/logout`;
    const response = await this.axiosInstance.post<ApiLogoutResponse>(url);
    this.removeAuthorizationHeader();
    return response.data;
  }

  async getFirmwares(): Promise<ApiGetFirmwaresResponse> {
    const url = `/cms/firmware`;
    const config = this.getConfig();
    const response = await this.axiosInstance.get<ApiGetFirmwaresResponse>(
      url,
      config
    );
    return response.data;
  }

  async postFirmware(
    params: ApiPostFirmwareParams
  ): Promise<ApiPostFirmwareResponse> {
    const url = `/cms/firmware`;
    const config = this.getConfig();
    const response = await this.axiosInstance.post<ApiPostFirmwareResponse>(
      url,
      JSON.stringify(params),
      config
    );
    return response.data;
  }

  async putFirmware(
    id: number,
    params: ApiPutFirmwareParams
  ): Promise<ApiPutFirmwareResponse> {
    const url = `/cms/firmware/${id}`;
    const config = this.getConfig();
    const response = await this.axiosInstance.put<ApiPutFirmwareResponse>(
      url,
      JSON.stringify(params),
      config
    );
    return response.data;
  }

  async deleteFirmware(
    params: ApiDeleteFirmwareParams
  ): Promise<ApiDeleteFirmwareResponse> {
    const url = `/cms/firmware`;
    const config = { ...this.getConfig(), params };
    const response = await this.axiosInstance.delete<ApiDeleteFirmwareResponse>(
      url,
      config
    );
    return response.data;
  }
}
