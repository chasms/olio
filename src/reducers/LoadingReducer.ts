import type { LoadingActions } from '../types/actions';
import { ActionTypes } from '../types/actions';

export default function Loading(state = true, action: LoadingActions) {
  switch (action.type) {
    case ActionTypes.FINISHED_LOADING:
      return false;
    default:
      return state;
  }
}
