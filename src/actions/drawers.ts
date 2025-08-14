import axios from 'axios';

import { api } from './api';
import { ActionTypes, type GetDrawersAction } from '../types/actions';
import type { Dispatch } from 'redux';

export const getDrawers = () => {
  return (dispatch: Dispatch<GetDrawersAction>) => {
    axios({
      method: 'get',
      url: api + '/categories/',
    }).then((resp) => {
      dispatch({ type: ActionTypes.GET_DRAWERS, payload: resp.data });
    });
  };
};
