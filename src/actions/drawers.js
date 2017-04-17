import axios from 'axios'

export const getDrawers = () => {
  return (dispatch) => {
    axios({
      method:'get',
      url:'http://localhost:3001/categories/'
    }).then(resp => {
      dispatch({type: 'GET_DRAWERS', payload: resp.data})
    })
  }
}
