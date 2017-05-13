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

const filterPerson = filter => person => {
  if (!filter) {
    return true;
  } else {
    const re = new RegExp(filter, 'i');
    return re.test(person.firstname) || re.test(person.lastname);
  }
};

export const getAllPersonIds = state => state.all;
export const getPersonById = (state, id) => state.map[id];
export const getFilteredPersonIds = (state, filter) => (
  state.all.map(id => state.map[id])
    .filter(filterPerson(filter))
    .map(person => person.id)
);
