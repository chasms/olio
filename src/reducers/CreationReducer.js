export default function Creations(state = [], action){
  switch (action.type) {
    case 'GET_CREATIONS':
      return [].concat(action.payload)
    case 'CLEAR_CREATIONS':
      return []
    default:
      return state
  }
}
