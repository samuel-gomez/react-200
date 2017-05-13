import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import people, * as fromPeople from './people/reducer';
import search from './search/reducer';
import discover from './discover/reducer';

export const rootReducer = combineReducers({ people, search, discover });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// selectors

export const getAllPersonIds = state => fromPeople.getAllPersonIds(state.people);
export const getPersonById = (state, id) => fromPeople.getPersonById(state.people, id);