import axios from 'axios'
import { api } from './api'

export const getAddons = () => {
  return (dispatch) => {
    axios({
      method:'get',
      url: api() + '/addons/'
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

export const saveAddonLocation = (id, coordinates, value) => ({
  type: 'STORE_LOCATION',
  payload: { id, coordinates, value }
})
