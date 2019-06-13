import axios, { AxiosInstance, AxiosError } from "axios";
import * as retryAxios from "retry-axios";
import { User } from "../types/models";
import { HttpStatusCode } from "../helpers/http";

export interface ApiLoginParams {
	email: string;
	password: string;
}

export interface ApiLoginResponse {
	accessToken: string;
	user: User;
}

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
		timeout: REQUEST_TIMEOUT
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
		const base64Token = btoa(`${token}:`);
		this.axiosInstance.defaults.headers.common.Authorization = `Basic ${base64Token}`;
	}

	removeAuthorizationHeader() {
		this.axiosInstance.defaults.headers.common.Authorization = undefined;
	}

	async login(params: ApiLoginParams): Promise<ApiLoginResponse> {
		const url = `/v1/login`;
		const response = await this.axiosInstance.post<ApiLoginResponse>(
			url,
			params
		);
		const { accessToken } = response.data;
		this.setAuthorizationHeader(accessToken);
		return response.data;
	}

	async logout(): Promise<ApiLogoutResponse> {
		const url = `/v1/logout`;
		const response = await this.axiosInstance.post<ApiLogoutResponse>(url);
		this.removeAuthorizationHeader();
		return response.data;
	}
}
