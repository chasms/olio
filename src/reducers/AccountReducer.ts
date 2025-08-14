import type { AccountActions } from '../types/actions';
import { ActionTypes } from '../types/actions';

export interface AccountState {
  token?: string | null;
  // additional account details dynamically loaded
  [key: string]: unknown;
}


const initial: AccountState = {
  token: typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null,
};

export default function Account(
  state: AccountState = initial,
  action: AccountActions
): AccountState {
  switch (action.type) {
  case ActionTypes.SET_TOKEN:
      return { token: action.payload.token };
  case ActionTypes.REMOVE_TOKEN:
      if (typeof localStorage !== 'undefined') localStorage.removeItem('token');
      return {};
  case ActionTypes.SET_ACCOUNT_DETAILS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
