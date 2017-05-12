import { combineReducers } from 'redux';

import {
  PEOPLE_RECEIVED,
  PERSON_RECEIVED,
  SEARCH_CHANGED,
  DISCOVER_NEXT,
  DISCOVER_PREV
} from './actions';

const replacePerson = (person, people) => {
  const personIndex = people.findIndex(p => p.id === person.id);
  if (personIndex >= 0) {
    return [...people.slice(0, personIndex), person, ...people.slice(personIndex + 1)];
  } else {
    return people; // this must not happen
  }
}

export const people = (state = [], action) => {
  switch (action.type) {
    case PEOPLE_RECEIVED:
      return action.people;
    case PERSON_RECEIVED:
      return replacePerson(action.person, state);
    default:
      return state;
  }
}


export const search = (state = '', action) => {
  switch (action.type) {
    case SEARCH_CHANGED:
      return action.search;
    default:
      return state;
  }
}


const succ = (current, min, max) => (current === max) ? min : current + 1;
const pred = (current, min, max) => (current === min) ? max : current - 1;

export const discover = (state = [null, 0], action) => {
  const [cur, max] = state;
  switch (action.type) {
    case PEOPLE_RECEIVED:
      return [0, action.people.length];
    case DISCOVER_NEXT:
      return max ? [succ(cur, 0, max - 1), max] : state;
    case DISCOVER_PREV:
      return max ? [pred(cur, 0, max - 1), max] : state;
    default:
      return state;
  }
};


const reducer = combineReducers({
  people, search, discover
});

export default reducer;