import axios from 'axios';
import { type Dispatch } from 'redux';

import { api } from './api';
import { deleteSuccess, saveSuccess, updateSuccess } from './consts';
import { error, success } from './notifications';
import {
  ActionTypes,
  type GetCreationsAction,
  type SetCurrentCreationAction,
  type DeleteAddonsAction,
  type RestoreCreationAction,
  type AddonItem,
  type Creation,
} from '../types/actions';

// Local union of the structured actions we dispatch here (excluding notification actions)
type CreationActions =
  | GetCreationsAction
  | SetCurrentCreationAction
  | DeleteAddonsAction
  | RestoreCreationAction;

// Helpers for axios response typing
type CreationsResponse = Creation[];
interface CreationResponse extends Creation {
  composition?: AddonItem[];
}

export const saveCreation = (addons: AddonItem[], title: string, token: string) => {
  return (dispatch: Dispatch) => {
    const typed = dispatch as Dispatch<CreationActions>;
    axios<CreationsResponse>({
      url: api + '/creations/',
      method: 'post',
      headers: { AUTHORIZATION: `Bearer ${token}` },
      data: { addons, title },
    }).then((resp) => {
      dispatch(success(saveSuccess));
      const last = resp.data[resp.data.length - 1];
      typed({
        type: ActionTypes.SET_CURRENT_CREATION,
        payload: { id: String(last.id), title: last.title },
      });
      typed({ type: ActionTypes.GET_CREATIONS, payload: resp.data });
    });
  };
};

export const updateCreation = (
  addons: AddonItem[],
  title: string,
  id: string | number,
  token: string
) => {
  return (dispatch: Dispatch) => {
    const typed = dispatch as Dispatch<CreationActions>;
    axios<CreationsResponse>({
      url: api + '/creations/' + id,
      method: 'patch',
      headers: { AUTHORIZATION: `Bearer ${token}` },
      data: { addons, title },
    }).then((resp) => {
      dispatch(success(updateSuccess));
      const last = resp.data[resp.data.length - 1];
      typed({
        type: ActionTypes.SET_CURRENT_CREATION,
        payload: { id: String(last.id), title: last.title },
      });
      typed({ type: ActionTypes.GET_CREATIONS, payload: resp.data });
    });
  };
};

export const deleteCreation = (id: string | number, title: string, token: string) => {
  return (dispatch: Dispatch) => {
    const typed = dispatch as Dispatch<CreationActions>;
    axios<CreationsResponse>({
      url: api + '/creations/' + id,
      method: 'delete',
      headers: { AUTHORIZATION: `Bearer ${token}` },
    }).then((resp) => {
      typed({ type: ActionTypes.GET_CREATIONS, payload: resp.data });
      dispatch(error(deleteSuccess(title)));
    });
  };
};

export const restoreCreation = (id: string | number, token: string) => {
  return (dispatch: Dispatch) => {
    const typed = dispatch as Dispatch<CreationActions>;
    axios<CreationResponse>({
      url: api + '/creations/' + id,
      method: 'get',
      headers: { AUTHORIZATION: `Bearer ${token}` },
    }).then((resp) => {
      typed({
        type: ActionTypes.SET_CURRENT_CREATION,
        payload: { id: String(resp.data.id), title: resp.data.title },
      });
      typed({ type: ActionTypes.DELETE_ADDONS });
      // Assuming backend returns full creation object including composition
      typed({
        type: ActionTypes.RESTORE_CREATION,
        payload: { composition: resp.data.composition || [] },
      });
    });
  };
};

export const getCreations = (token: string) => {
  return (dispatch: Dispatch<GetCreationsAction>) => {
    axios<CreationsResponse>({
      url: api + '/creations/',
      method: 'get',
      headers: { AUTHORIZATION: `Bearer ${token}` },
    }).then((resp) => {
      dispatch({ type: ActionTypes.GET_CREATIONS, payload: resp.data });
    });
  };
};
