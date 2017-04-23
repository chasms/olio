export default function Notifications(state = [], action){
  switch (action.type) {
    case 'GET_DRAWERS':
      return action.payload
    default:
      return state
  }
}
