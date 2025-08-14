import './index.css';

import React from 'react';
// eslint-disable-next-line react/no-deprecated
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './store';

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('content') as HTMLElement
);
