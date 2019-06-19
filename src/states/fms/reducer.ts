import { ActionType, getType } from "typesafe-actions";
import { actions } from "./actions";
import { Firmware } from "../../types/models";
import { actions as apiActions } from "../api/actions";

export interface FMSState {
  device: {
    putId?: number;
    firmwareIds: number[];
  };
}

const DEVICE_INTITIAL_STATE = {
  firmwareIds: []
};

const INITIAL_STATE = {
  device: DEVICE_INTITIAL_STATE
};

export function fms(
  state: FMSState = INITIAL_STATE,
  action: ActionType<typeof actions | typeof apiActions>
): FMSState {
  switch (action.type) {
    case getType(actions.setPutId): {
      const putId = action.payload;
      return {
        ...state,
        device: {
          ...state.device,
          putId
        }
      };
    }
    case getType(apiActions.getFirmwares.success):
      const { list: firmwares } = action.payload;

      return {
        ...state,
        device: {
          ...state.device,
          firmwareIds: firmwares.map((firmware: Firmware) => firmware.id)
        }
      };
    case getType(apiActions.deleteFirmware.success):
      const { ids } = action.payload;

      const remainingIds = state.device.firmwareIds.filter(
        id => ids.indexOf(id) === -1
      );

      return {
        ...state,
        device: {
          ...state.device,
          firmwareIds: remainingIds
        }
      };
    default:
      return state;
  }
}
