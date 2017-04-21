import axios from 'axios'

export const signup = (details) => {
  return (dispatch) => {
    axios.post('http://localhost:3001/signup/', details).then(resp => {
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
