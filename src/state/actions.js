import { getAllPeopleIds } from '.';

export const PEOPLE_RECEIVED = 'PEOPLE_RECEIVED';
export const PERSON_RECEIVED = 'PERSON_RECEIVED';
export const SEARCH_CHANGED = 'SEARCH_CHANGED';
export const DISCOVER_NEXT = 'DISCOVER_NEXT';
export const DISCOVER_PREV = 'DISCOVER_PREV';

export function peopleReceived(people) {
  return {
    type: PEOPLE_RECEIVED,
    people
  };
}

export function personReceived(person) {
  return {
    type: PERSON_RECEIVED,
    person
  };
}

export function searchChanged(search) {
  return {
    type: SEARCH_CHANGED,
    search
  };
}

export function discoverNextOf(of) {
  return {
    type: DISCOVER_NEXT,
    of
  };
}

export function discoverNext() {
  return (dispatch, getState) => {
    dispatch(discoverNextOf(getAllPeopleIds(getState()).length));
  };
}

export function discoverPrevOf(of) {
  return {
    type: DISCOVER_PREV,
    of
  };
}

export function discoverPrev() {
  return (dispatch, getState) => {
    dispatch(discoverPrevOf(getState().people.all.length));
  };
}