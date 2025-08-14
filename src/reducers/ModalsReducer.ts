import type { ModalsActions } from '../types/actions';
import { ActionTypes } from '../types/actions';

export interface ModalsState {
  welcome: boolean;
  webcam: boolean;
  save: boolean;
  sidebar: boolean;
}

const initial: ModalsState = { welcome: true, webcam: false, save: false, sidebar: false };

export default function Modals(
  state: ModalsState = initial,
  action: ModalsActions
): ModalsState {
  switch (action.type) {
  case ActionTypes.TOGGLE_WEBCAM:
      return { welcome: false, webcam: !state.webcam, save: false, sidebar: false };
  case ActionTypes.OPEN_SAVE:
      return { welcome: false, webcam: false, save: true, sidebar: false };
  case ActionTypes.TOGGLE_SIDEBAR:
      return { welcome: false, webcam: false, save: false, sidebar: !state.sidebar };
  case ActionTypes.CLOSE_ALL:
      return { welcome: false, webcam: false, save: false, sidebar: false };
    default:
      return state;
  }
}
