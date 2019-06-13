import { StoreState } from "..";
import { ById } from "../../types";
import { User } from "../../types/models";

export const $usersById = (state: StoreState): ById<User> =>
  state.cache.users.byId;
