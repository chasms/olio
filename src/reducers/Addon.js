export default function Addon(state = [], action){
  switch (action.type) {
    case 'ADD_ADDON':
      return [...state, {h: action.payload.initial_height, w: action.payload.initial_width, url: action.payload.url }]
    default:
      return state
  }
}
