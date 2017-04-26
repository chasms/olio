import axios from 'axios'
import { api } from './api'

export const getAddons = () => {
  return (dispatch) => {
    if (!sessionStorage.getItem('addons')) {
      axios({
        method:'get',
        url: api + '/addons/'
      }).then(resp => {
        setTimeout(() => {
          sessionStorage.setItem('addons', JSON.stringify(resp.data))
          dispatch({type: 'GET_ADDONS', payload: resp.data})
        }, 0,
      )
    })
  } else {
    dispatch({type: 'GET_ADDONS', payload: JSON.parse(sessionStorage.getItem('addons'))})
  }
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
