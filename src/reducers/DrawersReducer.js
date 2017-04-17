export default function Drawers(state = [], action){
  switch (action.type) {
    case 'GET_DRAWERS':
      return [...state, action.payload]
    default:
      return state
  }
}
