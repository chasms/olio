import axios from 'axios'

export const signup = (details) => {
  return (dispatch) => {
    axios.post('http://localhost:3001/signup/', details).then(resp => {

      localStorage.setItem('token', resp.data.token)
      dispatch({type: 'SET_TOKEN', payload: resp.data})
    })
  }
}
