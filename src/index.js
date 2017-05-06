import 'materialize-css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Formsy from 'formsy-react';
import { BrowserRouter } from 'react-router-dom';

import { configureStore } from './state/store';
import { setupVirtualServer } from './setup';
import { fetchPeople } from './service/peopleBackend';
import App from './App';
import './index.css';

const store = configureStore();

const startApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );

  fetchPeople(store.dispatch)();
};

setupVirtualServer()
.then(startApp)
.catch(console.error);

Formsy.addValidationRule('isFrenchPhoneNumber', (_, value) => (
  /^0[0-9]{9}$/.test(value)
));