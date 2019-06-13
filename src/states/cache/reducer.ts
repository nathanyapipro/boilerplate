import { ActionType, getType } from "typesafe-actions";
import { actions as apiActions } from "../api/actions";
import { User } from "../../types/models";
import { getLocalStorageAuthCredentials } from "../../helpers/auth";
import { ById } from "../../types";

export interface NormalizedModel<T> {
	byId: ById<T>;
	allIds: Array<string>;
}

export interface CacheState {
	users: NormalizedModel<User>;
}

interface HasId {
	id: string;
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

const credentials = getLocalStorageAuthCredentials();

const INITIAL_ENTITY_STATE = {
	byId: {},
	allIds: []
};

const INITIAL_STATE = {
	users: credentials
		? {
				byId: {
					[credentials.user.id]: credentials.user
				},
				allIds: [credentials.user.id]
		  }
		: INITIAL_ENTITY_STATE
};

export function cache(
	state: CacheState = INITIAL_STATE,
	action: ActionType<typeof apiActions>
): CacheState {
	switch (action.type) {
		case getType(apiActions.login.success): {
			const { user } = action.payload;

			return {
				...state,
				users: batchUpdate(state.users, [user])
			};
		}
		// case getType(apiActions.getUsers.success): {
		// 	const { data } = action.payload;

		// 	return {
		// 		...state,
		// 		users: batchUpdate(state.users, data)
		// 	};
		// }
		default:
			return state;
	}
}
