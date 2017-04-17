import axios from 'axios'

export const addAddon = (id) => ({
  return (dispatch) => {
    axios({
      method:'get',
      url:'http://localhost:3001/addons/' + id,
    }).then(resp => {
      dispatch({type: 'ADD_ADDON', payload: resp.data})
    })
  }
})
