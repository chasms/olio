export default function Forms(state = {
  loginForm: true,
}, action){
  switch (action.type) {
    case 'SWITCH_FORM':
      return { loginForm: !state.loginForm }
    case 'RESET_LOGIN_FORM':
      return { loginForm: true }
    default:
      return state
  }
}
