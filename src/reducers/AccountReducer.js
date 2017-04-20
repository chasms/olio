export default function Account(state = {token: localStorage.getItem('token')}, action){
  switch (action.type) {
    case 'SET_TOKEN':
    debugger
      return { token: action.payload.token }
    default:
      return state
  }
}
