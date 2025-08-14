import axios from 'axios';
import { api } from './api';
import { type AddonItem, type DeleteAddonsAction, type GetAddonsAction, type RemoveAddonAction, type StoreLocationAction } from '../types/actions';
import { ActionTypes } from '../types/actions';
import { type Dispatch } from 'redux';

export const getAddons = () => {
  return (dispatch: Dispatch<GetAddonsAction>) => {
    const cached = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('addons');

    if (!cached) {
      axios({ method: 'get', url: api + '/addons/' }).then((resp) => {
        setTimeout(() => {
          if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem('addons', JSON.stringify(resp.data));
          }
          dispatch({ type: ActionTypes.GET_ADDONS, payload: resp.data });
        }, 0);
      });
    } else {
      dispatch({ type: ActionTypes.GET_ADDONS, payload: JSON.parse(cached) });
    }
  };
};

export const addAddon = (addon: Partial<AddonItem>) => ({
  type: ActionTypes.ADD_ADDON,
  payload: addon,
});

export const removeAddon = (id: string): RemoveAddonAction => ({
  type: ActionTypes.REMOVE_ADDON,
  payload: { id },
});

export const deleteAllAddons = (): DeleteAddonsAction => ({ type: ActionTypes.DELETE_ADDONS });

export const saveAddonLocation = (
  id: string,
  coordinates: { top: number; left: number; height: number; width: number },
  value?: string
): StoreLocationAction => ({
  type: ActionTypes.STORE_LOCATION,
  payload: { id, coordinates, value },
});
