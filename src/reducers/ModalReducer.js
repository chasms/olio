export default function Modals(state = { welcome: true, login: false, signup: false, webcam: false, save: false }, action){
  switch (action.type) {
    case 'TOGGLE_WEBCAM':
      return { welcome: false, login: false, signup: false, webcam: !state.webcam, save: false }
    case 'OPEN_LOGIN':
      return { welcome: false, login: true, signup: false, webcam: false, save: false }
    case 'OPEN_SIGNUP':
      return { welcome: false, login: false, signup: true, webcam: false, save: false }
    case 'OPEN_SAVE':
      return { welcome: false, login: false, signup: false, webcam: false, save: true }
    case 'CLOSE_ALL':
      return { welcome: false, login: false, signup: false, webcam: false, save: false }
    default:
      return state
  }
}
