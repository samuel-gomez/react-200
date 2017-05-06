const initialState = {
  people: []
};

const replaceOrInsert = (person, people) => {
  const personIndex = people.findIndex(p => p.id === person.id);
  if (personIndex >= 0) {
    return [...people.slice(0, personIndex), person, ...people.slice(personIndex + 1)];
  } else {
    return [person, ...people];
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PEOPLE_RECEIVED':
      return { people: action.people };
    case 'PERSON_RECEIVED':
      return { people: replaceOrInsert(action.person, state.people) };
    default:
      return state;
  }
};

export default reducer;