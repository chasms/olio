export default function CurrentCreation(state = {}, action){
  switch (action.type) {
    case 'SET_CURRENT_CREATION':
      return {id: action.payload.id, title: action.payload.title}
    default:
      return state
  }
}
