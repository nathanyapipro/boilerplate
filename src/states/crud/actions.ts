import { createStandardAction } from "typesafe-actions";

export const actions = {
  reset: createStandardAction("crud/RESET")(),
  setEditId: createStandardAction("crud/SET_EDIT_ID")<number | undefined>(),
  setIsCreating: createStandardAction("crud/SET_IS_CREATING")<boolean>()
};
