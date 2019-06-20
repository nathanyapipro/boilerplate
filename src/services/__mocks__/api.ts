import { AxiosRequestConfig, AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import { Store } from "redux";
import * as authController from "./controllers/auth";
import * as fileController from "./controllers/file";
import * as deviceModelController from "./controllers/deviceModel";
import * as firmwareController from "./controllers/firmware";
import { StoreState, Actions } from "../../states";

function logAxiosConfig(config: AxiosRequestConfig): void {
  console.log("axios-mock-adapter: matched", config.url, config);
}

export function mockAxios(
  axiosInstance: AxiosInstance,
  store: Store<StoreState, Actions>
): void {
  console.log("axios-mock-adapter: enabled");
  const mock = new MockAdapter(axiosInstance, { delayResponse: 500 });

  mock.onPost(/\/cms\/account\/login$/).reply(config => {
    logAxiosConfig(config);
    try {
      const result = authController.login(config);
      return [200, result];
    } catch (e) {
      console.error("axios-mock-adapter: ", e);
      return [500, e];
    }
  });

  mock.onPost(/\/cms\/account\/logout$/).reply(config => {
    logAxiosConfig(config);
    try {
      const result = authController.logout();
      return [200, result];
    } catch (e) {
      console.error("axios-mock-adapter: ", e);
      return [500, e];
    }
  });

  mock.onPost(/\/file$/).reply(config => {
    logAxiosConfig(config);
    try {
      const result = fileController.postFileImageImage(
        config,
        store.getState()
      );
      return [200, result];
    } catch (e) {
      console.error("axios-mock-adapter: ", e);
      return [500, e];
    }
  });

  mock.onGet(/\/cms\/device\/model$/).reply(config => {
    logAxiosConfig(config);
    try {
      const result = deviceModelController.getDeviceModels(
        config,
        store.getState()
      );
      return [200, result];
    } catch (e) {
      console.error("axios-mock-adapter: ", e);
      return [500, e];
    }
  });

  mock.onPost(/\/cms\/device\/model$/).reply(config => {
    logAxiosConfig(config);
    try {
      const result = deviceModelController.postDeviceModel(
        config,
        store.getState()
      );
      return [200, result];
    } catch (e) {
      console.error("axios-mock-adapter: ", e);
      return [500, e];
    }
  });

  mock.onPut(/\/cms\/device\/model\/[0-9]+$/).reply(config => {
    logAxiosConfig(config);
    try {
      const result = deviceModelController.putDeviceModel(
        config,
        store.getState()
      );
      return [200, result];
    } catch (e) {
      console.error("axios-mock-adapter: ", e);
      return [500, e];
    }
  });

  mock.onDelete(/\/cms\/device\/model$/).reply(config => {
    logAxiosConfig(config);
    try {
      const result = deviceModelController.deleteDeviceModel(
        config,
        store.getState()
      );
      return [200, result];
    } catch (e) {
      console.error("axios-mock-adapter: ", e);
      return [500, e];
    }
  });

  mock.onGet(/\/cms\/firmware$/).reply(config => {
    logAxiosConfig(config);
    try {
      const result = firmwareController.getFirmwares(config, store.getState());
      return [200, result];
    } catch (e) {
      console.error("axios-mock-adapter: ", e);
      return [500, e];
    }
  });

  mock.onPost(/\/cms\/firmware$/).reply(config => {
    logAxiosConfig(config);
    try {
      const result = firmwareController.postFirmware(config, store.getState());
      return [200, result];
    } catch (e) {
      console.error("axios-mock-adapter: ", e);
      return [500, e];
    }
  });

  mock.onPut(/\/cms\/firmware\/[0-9]+$/).reply(config => {
    logAxiosConfig(config);
    try {
      const result = firmwareController.putFirmware(config, store.getState());
      return [200, result];
    } catch (e) {
      console.error("axios-mock-adapter: ", e);
      return [500, e];
    }
  });

  mock.onDelete(/\/cms\/firmware$/).reply(config => {
    logAxiosConfig(config);
    try {
      const result = firmwareController.deleteFirmware(
        config,
        store.getState()
      );
      return [200, result];
    } catch (e) {
      console.error("axios-mock-adapter: ", e);
      return [500, e];
    }
  });

  // Unmatched responses are forwarded to network
  mock.onAny().passThrough();
}
