export const addNotification = (text) => ({
  type: 'ADD_NOTIFICATION',
  payload: text
})

export const addError = (text) => ({
  type: 'ADD_ERROR',
  payload: text
})

export const removeNotifications = () => ({
  type: 'CLEAR_NOTIFICATIONS',
})
