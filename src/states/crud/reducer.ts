import { ActionType, getType } from "typesafe-actions";
import { actions } from "./actions";
import { Firmware } from "../../types/models";
import { actions as apiActions } from "../api/actions";
import { HasId } from "../../types";

export interface CrudState {
  editId?: number;
  ids: number[];
}

const INITIAL_STATE = {
  ids: []
};

export function crud(
  state: CrudState = INITIAL_STATE,
  action: ActionType<typeof actions | typeof apiActions>
): CrudState {
  switch (action.type) {
    case getType(actions.reset): {
      return INITIAL_STATE;
    }
    case getType(actions.setEditId): {
      const editId = action.payload;
      return {
        ...state,
        editId
      };
    }
    case getType(apiActions.getFirmwares.success):
      const data = action.payload;

      return {
        ...state,
        ids: data.map(data => data.id)
      };
    case getType(apiActions.deleteFirmware.success):
      const { ids } = action.payload;

      const remainingIds = state.ids.filter(id => ids.indexOf(id) === -1);

      return {
        ...state,
        ids: remainingIds
      };
    default:
      return state;
  }
}
