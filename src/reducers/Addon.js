export default function Addon(state = [], action){
  switch (action.type) {
    case 'ADD_ADDON':
      return [...state, {x: action.payload.x, y: action.payload.y, w: action.payload.w, h: action.payload.h, url: action.payload.url }]
    default:
      return state
  }
}
