import { combineReducers } from 'redux'
import Addon from './AddonReducer'
import AddonLibrary from './AddonLibraryReducer'
import Drawers from './DrawersReducer'


export default combineReducers({
  Addon,
  AddonLibrary,
  Drawers
})
