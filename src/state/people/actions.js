export const PEOPLE_REQUESTED = 'PEOPLE_REQUESTED';
export const PEOPLE_RECEIVED = 'PEOPLE_RECEIVED';
export const PEOPLE_REQUEST_FAILED = 'PEOPLE_REQUEST_FAILED';

export const PERSON_UPDATED = 'PERSON_UPDATED';
export const PERSON_RECEIVED = 'PERSON_RECEIVED';
export const PERSON_UPDATE_FAILED = 'PERSON_UPDATE_FAILED';


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
