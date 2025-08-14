import type { CurrentCreationActions } from '../types/actions';
import { ActionTypes } from '../types/actions';

export type CurrentCreationState = { id: string; title?: string } | null;

export default function CurrentCreation(
  state: CurrentCreationState = null,
  action: CurrentCreationActions
) {
  switch (action.type) {
  case ActionTypes.SET_CURRENT_CREATION:
      return { id: action.payload.id, title: action.payload.title };
    default:
      return state;
  }
}
