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

export function discoverNext() {
  return { type: DISCOVER_NEXT };
}

export function discoverPrev() {
  return { type: DISCOVER_PREV };
}