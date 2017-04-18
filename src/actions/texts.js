export const addText = () => ({
  type: 'ADD_TEXT',
})

export const removeText = (id) => ({
  type: 'REMOVE_TEXT',
  payload: { id: id }
})

export const saveTextLocation = (id, coordinates, value) => ({
  type: 'STORE_TEXT_INFO',
  payload: { id, coordinates }
})
