import { createStandardAction } from "typesafe-actions";

export const actions = {
  reset: createStandardAction("crud/RESET")(),
  setEditId: createStandardAction("crud/CRUD_SET_EDIT_ID")<number | undefined>()
};
