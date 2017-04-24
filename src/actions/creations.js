import axios from 'axios'
import { api } from './api'
import { success, error } from './notifications'
import { saveSuccess, deleteSuccess } from './consts'
export const saveCreation = (addons, token) => {
  return (dispatch) => {
    axios({
      url: api + '/creations/',
      method: 'post',
      headers: { 'AUTHORIZATION': `Bearer ${token}`},
      data: { addons: addons }
    }).then(resp => {
      dispatch(success(saveSuccess))
      dispatch({type: 'GET_CREATIONS', payload: resp.data})
    })
  }
}

export const deleteCreation = (id, token) => {
  return (dispatch) => {

    axios({
      url: api + '/creations/' + id,
      method: 'delete',
      headers: { 'AUTHORIZATION': `Bearer ${token}`},
    }).then(resp => {
      dispatch({type: 'GET_CREATIONS', payload: resp.data})
      dispatch(error(deleteSuccess(id)))
    })
  }
}

export const restoreCreation = (id, token) => {
  return (dispatch) => {

    axios({
      url: api + '/creations/' + id,
      method: 'get',
      headers: { 'AUTHORIZATION': `Bearer ${token}`},
    }).then(resp => {
      dispatch({type: 'DELETE_ADDONS'})
      dispatch({type: 'RESTORE_CREATION', payload: resp.data})
    })
  }
}

export const getCreations = (token) => {

  return (dispatch) => {

    axios({
      url: api + '/creations/',
      method: 'get',
      headers: { 'AUTHORIZATION': `Bearer ${token}`},
    }).then(resp => {

      dispatch({type: 'GET_CREATIONS', payload: resp.data})
    })
  }
}
