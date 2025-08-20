import type { DrawerActions } from '../types/actions';
import { ActionTypes } from '../types/actions';

export type DrawerState = unknown[];

export default function Drawers(state: DrawerState = [], action: DrawerActions) {
  switch (action.type) {
    case ActionTypes.GET_DRAWERS:
      return action.payload;
    default:
      return state;
  }
}
