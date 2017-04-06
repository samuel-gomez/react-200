import 'materialize-css';

import React from 'react';
import ReactDOM from 'react-dom';
import Formsy from 'formsy-react';
import { BrowserRouter } from 'react-router-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { setupVirtualServer } from './setup';
import { rootReducer } from './store/reducer';
import { fetchPeople } from './service/people';
import App from './App';
import './index.css';

const startApp = () => {

  const store = createStore(
    rootReducer,
    undefined,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );  
  
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
    document.getElementById('root')
  );

  fetchPeople()
  .then(people => store.dispatch({
    type: 'PEOPLE_RECEIVED',
    people
  }));

};

setupVirtualServer()
.then(startApp)
.catch(console.error);

Formsy.addValidationRule('isFrenchPhoneNumber', (_, value) => (
  /^0[0-9]{9}$/.test(value)
));