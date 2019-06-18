import { ActionType, getType } from "typesafe-actions";
import { actions as apiActions } from "../api/actions";
import { User, Firmware } from "../../types/models";
import { getLocalStorageAuthCredentials } from "../../helpers/auth";
import { ById } from "../../types";

export interface NormalizedModel<T> {
  byId: ById<T>;
  allIds: Array<number>;
}

export interface CacheState {
  users: NormalizedModel<User>;
  firmwares: NormalizedModel<Firmware>;
}

interface HasId {
  id: number;
}

function batchUpdate<T extends HasId>(
  initialState: NormalizedModel<T>,
  models: Array<T>
): NormalizedModel<T> {
  const newAllIds = models.map(m => m.id);
  const newById = models.reduce(
    (acc: ById<T>, model: T): ById<T> => ({
      ...acc,
      [model.id]: model
    }),
    {}
  );

  return {
    byId: {
      ...initialState.byId,
      ...newById
    },
    allIds: Array.from(new Set([...initialState.allIds, ...newAllIds]))
  };
}

export function batchDelete<T extends HasId>(
  initialState: NormalizedModel<T>,
  toDeleteIds: number[]
): NormalizedModel<T> {
  const remainingIds = initialState.allIds.filter(
    id => toDeleteIds.indexOf(id) === -1
  );

  const remainingById = remainingIds.reduce((acc, id) => {
    return {
      ...acc,
      [id]: initialState.byId[id]
    };
  }, {});

  return {
    byId: remainingById,
    allIds: remainingIds
  };
}

const credentials = getLocalStorageAuthCredentials();

const INITIAL_ENTITY_STATE = {
  byId: {},
  allIds: []
};

const INITIAL_STATE = {
  users: credentials
    ? {
        byId: {
          [credentials.id]: credentials
        },
        allIds: [credentials.id]
      }
    : INITIAL_ENTITY_STATE,
  firmwares: INITIAL_ENTITY_STATE
};

export function cache(
  state: CacheState = INITIAL_STATE,
  action: ActionType<typeof apiActions>
): CacheState {
  switch (action.type) {
    case getType(apiActions.login.success): {
      const user = action.payload;

      return {
        ...state,
        users: batchUpdate(state.users, [user])
      };
    }
    case getType(apiActions.getFirmwares.success): {
      const firmwares = action.payload;

      return {
        ...state,
        firmwares: batchUpdate(state.firmwares, firmwares)
      };
    }
    case getType(apiActions.postFirmware.success):
    case getType(apiActions.putFirmware.success): {
      const firmware = action.payload;

      return {
        ...state,
        firmwares: batchUpdate(state.firmwares, [firmware])
      };
    }
    case getType(apiActions.deleteFirmware.success): {
      const { ids } = action.payload;
      return {
        ...state,
        firmwares: batchDelete(state.firmwares, ids)
      };
    }
    default:
      return state;
  }
}
