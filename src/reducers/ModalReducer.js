export default function Modals(state = { welcome: true, login: false, signup: false, webcam: false, save: false, sidebar: false }, action){
  switch (action.type) {
    case 'OPEN_WEBCAM':
      return { welcome: false, login: false, signup: false, webcam: true, save: false, sidebar: false }
    case 'OPEN_LOGIN':
      return { welcome: false, login: true, signup: false, webcam: false, save: false, sidebar: false }
    case 'OPEN_SIGNUP':
      return { welcome: false, login: false, signup: true, webcam: false, save: false, sidebar: false }
    case 'OPEN_SAVE':
      return { welcome: false, login: false, signup: false, webcam: false, save: true, sidebar: false }
    case 'TOGGLE_SIDEBAR':
      return { welcome: false, login: false, signup: false, webcam: false, save: false, sidebar: !state.sidebar }
    case 'CLOSE_ALL':
      return { welcome: false, login: false, signup: false, webcam: false, save: false, sidebar: false }
    default:
      return state
  }
}
