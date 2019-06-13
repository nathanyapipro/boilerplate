import { createStandardAction } from "typesafe-actions";
import { AnyAction } from "redux";

export const actions = {
  close: createStandardAction("broadcastChannel/CLOSE")(),
  postMessage: createStandardAction("broadcastChannel/POST_MESSAGE")<
    AnyAction
  >()
};
