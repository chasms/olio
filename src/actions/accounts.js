import axios from 'axios'

export const signup = (details) => {
  return (dispatch) => {
    axios.post('http://localhost:3001/signup/', details).then(resp => {
      return null
    })
  }
}
