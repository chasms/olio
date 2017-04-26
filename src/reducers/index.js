import { combineReducers } from 'redux'
import Addon from './AddonReducer'
import AddonLibrary from './AddonLibraryReducer'
import Drawers from './DrawersReducer'
import Accounts from './AccountReducer'
import Creations from './CreationReducer'
import Loading from './LoadingReducer'
import CurrentCreation from './CurrentCreationReducer'
import Modals from './ModalsReducer'
import Forms from './FormsReducer'
import {reducer as Notifications} from 'react-notification-system-redux';


export default combineReducers({
  Addon,
  AddonLibrary,
  Drawers,
  Accounts,
  Creations,
  Notifications,
  Loading,
  CurrentCreation,
  Modals,
  Forms
})
