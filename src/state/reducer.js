const initialState = {
  people: [],
  search: '',
  discover: 0
};

const replaceOrInsert = (person, people) => {
  const personIndex = people.findIndex(p => p.id === person.id);
  if (personIndex >= 0) {
    return [...people.slice(0, personIndex), person, ...people.slice(personIndex + 1)];
  } else {
    return [person, ...people];
  }
}

const succ = (current, min, max) => (current === max) ? min : current + 1;
const pred = (current, min, max) => (current === min) ? max : current - 1;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PEOPLE_RECEIVED':
      return { ...state, people: action.people };
    case 'PERSON_RECEIVED':
      return { ...state, people: replaceOrInsert(action.person, state.people) };
    case 'SEARCH_CHANGED':
      return { ...state, search: action.search };
    case 'DISCOVER_NEXT':
      return { ...state, discover: succ(state.discover, 0, state.people.length - 1) };
    case 'DISCOVER_PREV':
      return { ...state, discover: pred(state.discover, 0, state.people.length - 1) };
    default:
      return state;
  }
};

export default reducer;