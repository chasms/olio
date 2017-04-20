export default function AddonLibrary(state = [], action){
  switch (action.type) {
    case 'GET_ADDONS':
    // 
      return action.payload
    default:
      return state
  }
}
