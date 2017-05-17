import { combineReducers } from 'redux';
import { PEOPLE_RECEIVED, PERSON_RECEIVED, PERSON_EDITING_STARTED, PERSON_EDITING_CANCELED, PERSON_UPDATE_REQUESTED, PERSON_UPDATE_FAILED } from '../actions';

const buildMap = a => a.reduce((m, c) => { m[c.id] = c; return m }, {});
const getEditingStatusFromType = (type) => {
  switch (type) {
    case PERSON_EDITING_STARTED: return 'EDITING';
    case PERSON_UPDATE_REQUESTED: return 'SAVING';
    case PERSON_UPDATE_FAILED: return 'FAILED';
    default: return undefined;
  }
}

export const mapReducer = (state = {}, action) => {
  switch (action.type) {
    case PEOPLE_RECEIVED:
      return buildMap(action.people);
    case PERSON_RECEIVED:
      return {...state, [action.person.id]: action.person};
    case PERSON_EDITING_STARTED:
    case PERSON_EDITING_CANCELED:
    case PERSON_UPDATE_REQUESTED:
    case PERSON_UPDATE_FAILED:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          _editingStatus: getEditingStatusFromType(action.type)
        }
      };
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
export const getEditingStatus = (state, id) => state.map[id] && state.map[id]._editingStatus;
export const getFilteredPersonIds = (state, filter) => (
  state.all.map(id => state.map[id])
    .filter(filterPerson(filter))
    .map(person => person.id)
);
