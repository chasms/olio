import { reducer as Notifications } from 'react-notification-system-redux';
import { combineReducers } from 'redux';

import Accounts from './AccountReducer';
import AddonLibrary from './AddonLibraryReducer';
import Addon from './AddonReducer';
import Creations from './CreationReducer';
import CurrentCreation from './CurrentCreationReducer';
import Drawers from './DrawersReducer';
import Forms from './FormsReducer';
import Loading from './LoadingReducer';
import Modals from './ModalsReducer';

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
