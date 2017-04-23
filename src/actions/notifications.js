export const addNotification = (notification) => ({
  type: 'ADD_NOTIFICATION',
  payload: text
})

export const removeNotification = (id) => ({
  type: 'REMOVE_NOTIFICATION',
  payload: {id: id}
})