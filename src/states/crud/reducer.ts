import { ActionType, getType } from "typesafe-actions";
import { actions } from "./actions";
import { Pagination } from "../../types/models";
import { actions as apiActions } from "../api/actions";
import { HasId } from "../../types";

export interface CrudState {
  editId?: number;
  isCreating: boolean;
  ids: number[];
  pagination?: Pagination;
}

const INITIAL_STATE = {
  isCreating: false,
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
    case getType(actions.setIsCreating): {
      const isCreating = action.payload;
      return {
        ...state,
        isCreating
      };
    }
    case getType(actions.setEditId): {
      const editId = action.payload;
      return {
        ...state,
        editId
      };
    }
    case getType(apiActions.getDeviceModels.success):
    case getType(apiActions.getFirmwares.success): {
      const { list, ...pagination } = action.payload;

      return {
        ...state,
        //@ts-ignore
        ids: list.map((item: HasId) => item.id),
        pagination
      };
    }
    case getType(apiActions.deleteFirmware.success): {
      const { ids } = action.payload;

      const remainingIds = state.ids.filter(id => ids.indexOf(id) === -1);

      const pagination = state.pagination
        ? {
            ...state.pagination,
            total: state.pagination.total - ids.length
          }
        : undefined;

      return {
        ...state,
        ids: remainingIds,
        pagination
      };
    }
    default:
      return state;
  }
}
