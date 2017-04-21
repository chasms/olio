import axios from 'axios'

export const saveCreation = (addons, token) => {
  return (dispatch) => {

    axios({
      url: 'http://localhost:3001/creations/',
      method: 'post',
      headers: { 'AUTHORIZATION': `Bearer ${token}`},
      data: { addons: addons }
    }).then(resp => {
      return
    })
  }
}

export const restoreCreation = (id, token) => {
  return (dispatch) => {

    axios({
      url: 'http://localhost:3001/creations/' + id,
      method: 'get',
      headers: { 'AUTHORIZATION': `Bearer ${token}`},
    }).then(resp => {
      dispatch({type: 'DELETE_ADDONS'})
      dispatch({type: 'RESTORE_CREATION', payload: resp.data})
    })
  }
}

export const getCreations = (id, token) => {
  return (dispatch) => {

    axios({
      url: 'http://localhost:3001/creations/',
      method: 'get',
      headers: { 'AUTHORIZATION': `Bearer ${token}`},
    }).then(resp => {
      dispatch({type: 'GET_CREATIONS', payload: resp.data})
    })
  }
}
