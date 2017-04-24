import axios from 'axios'
import { api } from './api'
import { error, success } from './notifications'
import { signupError, loginError, logoutAlert, signupSuccess, loginSuccess } from './consts'


export const signup = (details) => {
  return (dispatch) => {
    axios.post(api + '/signup/', details)
    .then(resp => {
      localStorage.setItem('token', resp.data.token)
      dispatch({type: 'SET_TOKEN', payload: resp.data})
      dispatch(success(signupSuccess))
    })
    .catch((e) => {
      dispatch({type: 'REMOVE_TOKEN'})
      e.response.data.errors.forEach((errorMsg) => {
        dispatch(error(signupError(errorMsg)))
      })
    })
  }
}

export const login = (details) => {
  return (dispatch) => {
    axios.post(api + '/login/', details)
    .then(resp => {
      localStorage.setItem('token', resp.data.token)
      dispatch({type: 'SET_TOKEN', payload: resp.data})
      dispatch(success(loginSuccess))
    })
    .catch((e) => {
      dispatch({type: 'REMOVE_TOKEN'})
      dispatch(error(loginError))
    })
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch({type: 'REMOVE_TOKEN'})
    dispatch(error(logoutAlert))
  }
}

export const checkIfLoggedIn = () => {

  return {
    type: 'SET_TOKEN',
    payload: {token: localStorage.getItem('token')}
  }
}
