export default function Account(state = {token: localStorage.getItem('token')}, action){
  switch (action.type) {
    case 'SET_TOKEN':
      return { token: action.payload.token }
    case 'REMOVE_TOKEN':
      localStorage.setItem('token', '')
      return {}
    default:
      return state
  }
}
