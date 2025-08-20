import type { FormsActions } from '../types/actions';
import { ActionTypes } from '../types/actions';

export interface FormsState {
  loginForm: boolean;
}

const initial: FormsState = { loginForm: true };

export default function Forms(state: FormsState = initial, action: FormsActions): FormsState {
  switch (action.type) {
    case ActionTypes.SWITCH_FORM:
      return { loginForm: !state.loginForm };
    case ActionTypes.RESET_LOGIN_FORM:
      return { loginForm: true };
    default:
      return state;
  }
}
