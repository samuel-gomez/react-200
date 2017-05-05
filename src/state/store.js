import { createStore } from 'redux';

const initialState = {};

const rootReducer = (state = initialState, action) => state;

export const configureStore = () => createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);