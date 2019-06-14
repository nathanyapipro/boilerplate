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

export interface HttpResponse<T> extends Response {
  parsedBody: T;
}

export const http = <T>(request: RequestInfo): Promise<HttpResponse<T>> => {
  return new Promise((resolve, reject) => {
    let response: Response;
    let parsedResponse: HttpResponse<T>;
    fetch(request)
      .then(res => {
        response = res;
        return res.json();
      })
      .then(body => {
        if (response.ok) {
          parsedResponse = {
            ...response,
            parsedBody: body
          };
          resolve(parsedResponse);
        } else {
          reject(response);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

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

  getHeaders(): any {
    const plateformKey = "cf053c9deaed22f035261bde50c1d6e8";
    const uuid = getLocalStorageAuthUuid();
    const time = Math.floor(+new Date() / 1000) + "";
    const arr = [plateformKey, time, uuid];
    const temp = arr.sort().join("");
    const apiKey = sha1(temp);

    return {
      Authorization: this.token,
      "Content-Type": "application/json",
      apiKey: apiKey,
      time: time,
      uuid: uuid,
      version: "cms1"
    };
  }

  get = async <T>(
    path: string,
    args: RequestInit = {
      method: "get",
      headers: this.getHeaders()
    }
  ): Promise<HttpResponse<T>> => {
    return await http<T>(new Request(path, args));
  };

  post = async <T>(
    path: string,
    body: any,
    args: RequestInit = {
      method: "post",
      body: JSON.stringify(body),
      headers: this.getHeaders()
    }
  ): Promise<HttpResponse<T>> => {
    return await http<T>(new Request(path, args));
  };

  put = async <T>(
    path: string,
    body: any,
    args: RequestInit = {
      method: "put",
      body: JSON.stringify(body),
      headers: this.getHeaders()
    }
  ): Promise<HttpResponse<T>> => {
    return await http<T>(new Request(path, args));
  };

  async login(params: ApiLoginParams): Promise<ApiLoginResponse> {
    const response = await this.post<ApiLoginResponse>(
      `${this.urlBase}/cms/account/login`,
      params
    );

    const data = response.parsedBody;
    this.setAuthorizationHeader(data.appToken);
    return data;
  }

  // async login(params: ApiLoginParams): Promise<ApiLoginResponse> {
  //   const url = `/cms/account/login`;
  //   const config = this.getConfig();
  //   const response = await this.axiosInstance.post<ApiLoginResponse>(
  //     url,
  //     JSON.stringify(params),
  //     config
  //   );
  //   const { appToken } = response.data;
  //   this.setAuthorizationHeader(appToken);
  //   return response.data;
  // }

  async logout(): Promise<ApiLogoutResponse> {
    const url = `/v1/logout`;
    const response = await this.axiosInstance.post<ApiLogoutResponse>(url);
    this.removeAuthorizationHeader();
    return response.data;
  }
}
