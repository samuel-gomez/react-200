import { combineReducers } from 'redux';
import { PEOPLE_RECEIVED, PERSON_RECEIVED } from '../actions';

const buildMap = a => a.reduce((m, c) => { m[c.id] = c; return m }, {});

export const mapReducer = (state = {}, action) => {
  switch (action.type) {
    case PEOPLE_RECEIVED:
      return buildMap(action.people);
    case PERSON_RECEIVED:
      return {...state, [action.person.id]: action.person};
    default:
      return state;
  }
};

export const allReducer = (state = [], action) => {
  switch (action.type) {
    case PEOPLE_RECEIVED:
      return action.people.map(person => person.id);
    case PERSON_RECEIVED:
      return state.includes(action.person.id) ? state : [action.person.id, ...state];
    default:
      return state;
  }
};

export default combineReducers({
  map: mapReducer,
  all: allReducer
});

// selectors

export const getAllPersonIds = state => state.all;
export const getPersonById = (state, id) => state.map[id];