import { applyMiddleware, compose, createStore } from 'redux';
import * as thunkModule from 'redux-thunk';
// Support both CJS and ESM default export shapes
const thunkMiddleware: any =
  (thunkModule as any).default || (thunkModule as any).thunk || thunkModule;
import rootReducer from './reducers';

export type RootState = ReturnType<typeof rootReducer>;
const composeEnhancers =
  (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export function configureStore() {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware as any)));
}

export const store = configureStore();
