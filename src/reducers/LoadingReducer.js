export default function Loading(state = true, action){
  switch (action.type) {
    case 'FINISHED_LOADING':
      return false
    default:
      return state
  }
}
