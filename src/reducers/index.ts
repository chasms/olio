import { combineReducers } from 'redux';
import Addon from './AddonReducer';
import AddonLibrary from './AddonLibraryReducer';
import Drawers from './DrawersReducer';
import Accounts from './AccountReducer';
import Creations from './CreationReducer';
import Loading from './LoadingReducer';
import CurrentCreation from './CurrentCreationReducer';
import Modals from './ModalsReducer';
import Forms from './FormsReducer';
import { reducer as Notifications} from 'react-notification-system-redux';

const rootReducer = combineReducers({
  Addon,
  AddonLibrary,
  Drawers,
  Accounts,
  Creations,
  Notifications,
  Loading,
  CurrentCreation,
  Modals,
  Forms,
});

export default rootReducer;
export type RootReducer = typeof rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
