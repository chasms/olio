import { ActionTypes, type FinishedLoadingAction } from "../types/actions";

export const finishedLoading = (): FinishedLoadingAction => ({
  type: ActionTypes.FINISHED_LOADING,
});
