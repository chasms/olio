import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export function configureStore() {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
}

export const store = configureStore();
