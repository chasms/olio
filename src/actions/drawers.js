import axios from 'axios'
import { api } from './api'

export const getDrawers = () => {
  return (dispatch) => {
    axios({
      method:'get',
      url: api + '/categories/'
    }).then(resp => {
      dispatch({type: 'GET_DRAWERS', payload: resp.data})
    })
  }
}
