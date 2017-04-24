export const signupError = (error) => ({
  title: 'Error Signing Up',
  message: error,
  position: 'tl',
  autoDismiss: 4
})

export const loginError = {
  title: 'Sorry!',
  message: 'Your username and password didn\'t match',
  position: 'tl',
  autoDismiss: 5
}

export const logoutAlert = {
  title: 'Logout!',
  message: 'You have logged out',
  position: 'tl',
  autoDismiss: 3
}

export const signupSuccess = {
  title: 'Signup Successful',
  message: 'You have successfully signed up for Olio!',
  position: 'tl',
  autoDismiss: 3
}

export const loginSuccess = {
  title: 'Log In Successful',
  message: 'You have logged in to Olio!',
  position: 'tl',
  autoDismiss: 3
}

export const saveSuccess = {
  title: 'Creation Saved!',
  message: 'You have saved your creation!',
  position: 'tl',
  autoDismiss: 3
}

export const deleteSuccess = (id) => ({
  title: 'Deleted Creation!',
  message: 'You have deleted creation #' + id,
  position: 'tl',
  autoDismiss: 3
})
