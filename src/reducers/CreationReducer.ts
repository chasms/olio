import type { Creation, CreationActions } from '../types/actions';
import { ActionTypes } from '../types/actions';

export type CreationsState = Creation[];

export default function Creations(state: CreationsState = [], action: CreationActions) {
  switch (action.type) {
    case ActionTypes.GET_CREATIONS:
      return [...action.payload];
    case ActionTypes.CLEAR_CREATIONS:
      return [];
    default:
      return state;
  }
}
