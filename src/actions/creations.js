import axios from 'axios'
import { api } from './api'
import { success, error } from './notifications'
import { saveSuccess, deleteSuccess, updateSuccess } from './consts'
export const saveCreation = (addons, title, token) => {
  return (dispatch) => {
    axios({
      url: api + '/creations/',
      method: 'post',
      headers: { 'AUTHORIZATION': `Bearer ${token}`},
      data: {
        addons: addons,
        title: title
      }
    }).then(resp => {
      dispatch(success(saveSuccess))
      dispatch({type: 'SET_CURRENT_CREATION', payload: {id: resp.data[resp.data.length-1].id, title: resp.data[resp.data.length-1].title}})
      dispatch({type: 'GET_CREATIONS', payload: resp.data})
    })
  }
}

export const updateCreation = (addons, title, id, token) => {
  return (dispatch) => {
    axios({
      url: api + '/creations/' + id,
      method: 'patch',
      headers: { 'AUTHORIZATION': `Bearer ${token}`},
      data: {
        addons: addons,
        title: title
      }
    }).then(resp => {
      dispatch(success(updateSuccess))
      dispatch({type: 'SET_CURRENT_CREATION', payload: {id: resp.data[resp.data.length-1].id, title: resp.data[resp.data.length-1].title}})
      dispatch({type: 'GET_CREATIONS', payload: resp.data})
    })
  }
}

export const deleteCreation = (id, title, token) => {
  return (dispatch) => {

    axios({
      url: api + '/creations/' + id,
      method: 'delete',
      headers: { 'AUTHORIZATION': `Bearer ${token}`},
    }).then(resp => {
      dispatch({type: 'GET_CREATIONS', payload: resp.data})
      dispatch(error(deleteSuccess(title)))
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
      dispatch({type: 'SET_CURRENT_CREATION', payload: {id: resp.data.id, title: resp.data.title}})
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
