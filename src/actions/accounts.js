import axios from 'axios'
import { api } from './api'

export const signup = (details) => {
  return (dispatch) => {
    axios.post(api() + '/signup/', details).then(resp => {
      localStorage.setItem('token', resp.data.token)
      dispatch({type: 'SET_TOKEN', payload: resp.data})
    })
  }
}

export const login = (details) => {
  return (dispatch) => {
    axios.post(api() + '/login/', details).then(resp => {
      debugger
      localStorage.setItem('token', resp.data.token)
      dispatch({type: 'SET_TOKEN', payload: resp.data})
    })
  }
}

export const logout = () => ({
  type: 'REMOVE_TOKEN'
})

export const checkIfLoggedIn = () => {

  return {
    type: 'SET_TOKEN',
    payload: {token: localStorage.getItem('token')}
  }
}
