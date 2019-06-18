import { createStandardAction } from "typesafe-actions";

export const actions = {
  setPutId: createStandardAction("fms/DEVICE_SET_PUT_ID")<number | undefined>()
};
