import axios from 'axios'

export const getAddons = () => {
  return (dispatch) => {
    axios({
      method:'get',
      url:'http://localhost:3001/categories/'
    }).then(resp => {
      dispatch({type: 'GET_ADDONS', payload: resp.data})
    })
  }
}

export const getAddonsByCategory = (category_name) => {
  return (dispatch) => {
    axios({
      method:'get',
      url:'http://localhost:3001/categories/${category_name}/'
    }).then(resp => {
      dispatch({type: 'GET_ADDONS', payload: resp.data})
    })
  }
}

export const addAddon = (addon) => ({
  type: 'ADD_ADDON',
  payload: addon
})

export const removeAddon = (id) => ({
  type: 'REMOVE_ADDON',
  payload: {id: id}
})

export const saveAddonLocation = (id, coordinates) => ({
  type: 'STORE_LOCATION',
  payload: { id, coordinates }
})
