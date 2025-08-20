import type { AddonLibraryActions, AddonLibraryItem } from '../types/actions';
import { ActionTypes } from '../types/actions';

export type AddonLibraryState = AddonLibraryItem[];

export default function AddonLibrary(state: AddonLibraryState = [], action: AddonLibraryActions) {
  switch (action.type) {
    case ActionTypes.GET_ADDONS:
      return action.payload;
    default:
      return state;
  }
}
