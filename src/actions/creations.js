import axios from 'axios'

export const saveCreation = (addons, token) => {
  return (dispatch) => {
    debugger
    axios({
      url: 'http://localhost:3001/creations/',
      method: 'post',
      headers: { 'AUTHORIZATION': `Bearer ${token}`},
      data: { addons: addons }
    }).then(resp => {

      dispatch({type: 'SET_TOKEN', payload: resp.data})
    })
  }
}
