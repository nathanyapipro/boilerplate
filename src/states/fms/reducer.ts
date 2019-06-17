import { ActionType, getType } from "typesafe-actions";
import { actions } from "./actions";
import { Firmware } from "../../types/models";
import { actions as apiActions } from "../api/actions";

export interface FMSState {
	device: {
		selectedId?: number;
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
		case getType(apiActions.getFirmwares.success):
			const firmwares = action.payload;

			return {
				...state,
				device: {
					...state.device,
					firmwareIds: firmwares.map((firmware: Firmware) => firmware.id)
				}
			};
		default:
			return state;
	}
}
