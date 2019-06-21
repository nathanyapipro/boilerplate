import { createSelector } from "reselect";
import { StoreState } from "..";
import { ById } from "../../types";
import { User, DeviceModel } from "../../types/models";
import { formatDeviceModel } from "../../helpers/deviceModel";

export const $usersById = (state: StoreState): ById<User> =>
  state.cache.users.byId;

export const $deviceModelsById = (state: StoreState): ById<DeviceModel> =>
  state.cache.deviceModels.byId;

export const $deviceModelOptions = createSelector(
  [$deviceModelsById],
  deviceModelsById => {
    return Object.keys(deviceModelsById).map(key => ({
      value: deviceModelsById[key].id,
      label: formatDeviceModel(deviceModelsById[key]),
      imageUrl: deviceModelsById[key].imageUrl
    }));
  }
);
