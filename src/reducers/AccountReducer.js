export default function Account(state = {
  token: localStorage.getItem('token')
}, action){
  switch (action.type) {
    case 'SET_TOKEN':
      return { token: action.payload.token }
    case 'REMOVE_TOKEN':
      localStorage.removeItem('token')
      return {}
    case 'SET_ACCOUNT_DETAILS':
      return Object.assign({}, state, action.payload )
    default:
      return state
  }
}
