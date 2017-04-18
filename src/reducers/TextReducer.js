var cuid = require('cuid');

export default function makeText(state = [], action){
	switch(action.type){
		case 'ADD_TEXT':
			return[...state, {x: 0, y: 0, h: 100, w: 200, value: "text", id: cuid() }]
		case 'REMOVE_TEXT':
			return state.filter((t) => {
				return t.id !== action.payload.id
			})
		// case SAVE_TEXT_INFO:
		default:
		return state

	}
}
