import { createStandardAction } from "typesafe-actions";
import { SnackbarMessage } from "../../components/Snackbar";

export const actions = {
  addSnackbarQueueItem: createStandardAction(
    "snackbar/ADD_SNACKBAR_QUEUE_ITEM"
  )<SnackbarMessage>(),
  snackbarQueueItemProcessed: createStandardAction(
    "snackbar/SNACKBAR_QUEUE_ITEM_PROCESSED"
  )()
};
