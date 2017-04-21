export default function Creations(state = [], action){
  switch (action.type) {
    case 'GET_CREATIONS':
      return action.payload
    default:
      return state
  }
}
