import axios from 'axios'

export const getAddons = () => {
  return (dispatch) => {
    axios({
      method:'get',
      url:'http://localhost:3001/addons/'
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

export const deleteAllAddons = () => ({
  type: 'DELETE_ADDONS'
})

export const saveAddonLocation = (id, coordinates, category) => ({
  type: 'STORE_LOCATION',
  payload: { id, coordinates, category }
})
