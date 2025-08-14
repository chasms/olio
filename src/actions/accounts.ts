import axios from 'axios';
import type { Dispatch } from 'redux';

import { api } from './api';
import { loginError, loginSuccess, logoutAlert, signupError, signupSuccess } from './consts';
import { error, success } from './notifications';
import {
  ActionTypes,
  type SetTokenAction,
  type SetAccountDetailsAction,
  type GetCreationsAction,
  type RemoveTokenAction,
  type ClearCreationsAction,
  type ResetLoginFormAction,
  type Creation,
} from '../types/actions';

// Shape of credentials / signup details we expect (best-effort; adjust as backend evolves)
export interface AuthDetails {
  username: string;
  password: string;
  email?: string;
  [key: string]: unknown; // allow extra backend-accepted fields without widening everywhere
}

// Response shape from /signup/ and /login/
interface AuthResponse {
  token: string;
  account: string; // username
  creations: Creation[];
  [key: string]: unknown;
}

// Response shape from /accounts/
interface AccountDetailsResponse {
  username?: string;
  [key: string]: unknown;
}

// Union of internal actions we dispatch here (excluding external notification actions which come from another lib)
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type AccountsActions =
  | SetTokenAction
  | SetAccountDetailsAction
  | GetCreationsAction
  | RemoveTokenAction
  | ClearCreationsAction
  | ResetLoginFormAction;

export const signup = (details: AuthDetails) => {
  return (dispatch: Dispatch<AccountsActions | ReturnType<typeof success> | ReturnType<typeof error>>) => {
    axios
      .post<AuthResponse>(api + '/signup/', details)
      .then((resp) => {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('token', resp.data.token);
        }
        dispatch({ type: ActionTypes.SET_TOKEN, payload: { token: resp.data.token } });
        dispatch({ type: ActionTypes.SET_ACCOUNT_DETAILS, payload: { username: resp.data.account } });
        dispatch({ type: ActionTypes.GET_CREATIONS, payload: resp.data.creations });
        dispatch(success(signupSuccess));
      })
      .catch((e: any) => {
        dispatch({ type: ActionTypes.REMOVE_TOKEN });
        const errors: string[] = e?.response?.data?.errors || ['Unknown signup error'];
        errors.forEach((msg) => dispatch(error(signupError(msg))));
      });
  };
};

export const login = (details: AuthDetails) => {
  return (dispatch: Dispatch<AccountsActions | ReturnType<typeof success> | ReturnType<typeof error>>) => {
    axios
      .post<AuthResponse>(api + '/login/', details)
      .then((resp) => {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('token', resp.data.token);
        }
        dispatch({ type: ActionTypes.SET_TOKEN, payload: { token: resp.data.token } });
        dispatch({ type: ActionTypes.GET_CREATIONS, payload: resp.data.creations });
        dispatch({ type: ActionTypes.SET_ACCOUNT_DETAILS, payload: { username: resp.data.account } });
        dispatch(success(loginSuccess));
      })
      .catch(() => {
        dispatch({ type: ActionTypes.REMOVE_TOKEN });
        dispatch(error(loginError));
      });
  };
};

export const logout = () => {
  return (dispatch: Dispatch<AccountsActions | ReturnType<typeof error>>) => {
    dispatch({ type: ActionTypes.REMOVE_TOKEN });
    dispatch({ type: ActionTypes.RESET_LOGIN_FORM });
    dispatch({ type: ActionTypes.CLEAR_CREATIONS });
    dispatch(error(logoutAlert));
  };
};

export const checkIfLoggedIn = (): SetTokenAction => ({
  type: ActionTypes.SET_TOKEN,
  payload: { token: typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null },
});

export const getAccountDetails = (token: string) => {
  return (dispatch: Dispatch<AccountsActions>) => {
    axios<AccountDetailsResponse>({
      url: api + '/accounts/',
      method: 'get',
      headers: { AUTHORIZATION: `Bearer ${token}` },
    })
      .then((resp) => {
        dispatch({ type: ActionTypes.SET_ACCOUNT_DETAILS, payload: resp.data });
      })
      .catch(() => {
        dispatch({ type: ActionTypes.REMOVE_TOKEN });
        if (typeof localStorage !== 'undefined') localStorage.removeItem('token');
      });
  };
};
