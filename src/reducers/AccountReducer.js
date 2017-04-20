export default function Account(state = [ localStorage.getItem('token') ], action){
  switch (action.type) {
    case 'SET_TOKEN':
    debugger
      return [ action.payload.token ]
    default:
      return state
  }
}
