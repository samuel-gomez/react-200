import {
  PEOPLE_RECEIVED,
  PERSON_RECEIVED,
  SEARCH_CHANGED,
  DISCOVER_NEXT,
  DISCOVER_PREV
} from './actions';

const replaceOrInsert = (person, people) => {
  const personIndex = people.findIndex(p => p.id === person.id);
  if (personIndex >= 0) {
    return [...people.slice(0, personIndex), person, ...people.slice(personIndex + 1)];
  } else {
    return [person, ...people];
  }
}

export const people = (state = [], action) => {
  switch (action.type) {
    case PEOPLE_RECEIVED:
      return action.people;
    case PERSON_RECEIVED:
      return replaceOrInsert(action.person, state);
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

export const discover = (state = 0, length, action) => {
  switch (action.type) {
    case DISCOVER_NEXT:
      return succ(state, 0, length - 1);
    case DISCOVER_PREV:
      return pred(state, 0, length - 1);
    default:
      return state;
  }
};


const reducer = (state = {}, action) => ({
  people: people(state.people, action),
  search: search(state.search, action),
  discover: discover(state.discover, state.people && state.people.length, action)
})

export default reducer;