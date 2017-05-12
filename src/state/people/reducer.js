import { PEOPLE_RECEIVED, PERSON_RECEIVED } from '../actions';

const replacePerson = (person, people) => {
  const personIndex = people.findIndex(p => p.id === person.id);
  if (personIndex >= 0) {
    return [...people.slice(0, personIndex), person, ...people.slice(personIndex + 1)];
  } else {
    return people; // this must not happen
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case PEOPLE_RECEIVED:
      return action.people;
    case PERSON_RECEIVED:
      return replacePerson(action.person, state);
    default:
      return state;
  }
}

export default reducer;