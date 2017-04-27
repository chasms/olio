export const signupError = (error) => ({
  title: 'Error Signing Up',
  message: error,
  position: 'tc',
  autoDismiss: 4
})

export const loginError = {
  title: 'Sorry!',
  message: 'Your username and password didn\'t match',
  position: 'tc',
  autoDismiss: 5
}

export const logoutAlert = {
  title: 'Logout!',
  message: 'You have logged out',
  position: 'tc',
  autoDismiss: 3
}

export const signupSuccess = {
  title: 'Signup Successful',
  message: 'You have successfully signed up for Olio!',
  position: 'tc',
  autoDismiss: 3
}

export const loginSuccess = {
  title: 'Log In Successful',
  message: 'You have logged in to Olio!',
  position: 'tc',
  autoDismiss: 3
}

export const saveSuccess = {
  title: 'Creation Saved!',
  message: 'You have saved your creation!',
  position: 'tc',
  autoDismiss: 3
}

export const updateSuccess = {
  title: 'Creation Saved!',
  message: 'You have updated your creation!',
  position: 'tc',
  autoDismiss: 3
}

export const deleteSuccess = (title) => ({
  title: 'Deleted Creation!',
  message: 'You have deleted' + title,
  position: 'tc',
  autoDismiss: 3
})
