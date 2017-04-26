export default function Modals(state = {
  welcome: true,
  login: false,
  signup: false,
  webcam: false,
  save: false,
  sidebar: false
}, action){
  switch (action.type) {
    case 'TOGGLE_WEBCAM':
      return { welcome: false, webcam: !state.webcam, save: false, sidebar: false }
    case 'OPEN_LOGIN':
      return { welcome: false, webcam: false, save: false, sidebar: false }
    case 'OPEN_SIGNUP':
      return { welcome: false, webcam: false, save: false, sidebar: false }
    case 'OPEN_SAVE':
      return { welcome: false, webcam: false, save: true, sidebar: false }
    case 'TOGGLE_SIDEBAR':
      return { welcome: false, webcam: false, save: false, sidebar: !state.sidebar }
    case 'CLOSE_ALL':
      return { welcome: false, webcam: false, save: false, sidebar: false }
    default:
      return state
  }
}
