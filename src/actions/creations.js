import axios from 'axios'

export const saveCreation = (addons, token) => {
  return (dispatch) => {
    axios({
      url: 'http://localhost:3001/creations/',
      method: 'post',
      headers: { 'HTTP_AUTHORIZATION': `Bearer ${token}`}
    }).then(resp => {

      dispatch({type: 'SET_TOKEN', payload: resp.data})
    })
  }
}
