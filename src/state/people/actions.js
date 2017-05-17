import api from '../../service/peopleBackend';

export const PEOPLE_REQUESTED = 'PEOPLE_REQUESTED';
export const PEOPLE_RECEIVED = 'PEOPLE_RECEIVED';
export const PEOPLE_REQUEST_FAILED = 'PEOPLE_REQUEST_FAILED';

export const PERSON_UPDATE_REQUESTED = 'PERSON_UPDATE_REQUESTED';
export const PERSON_RECEIVED = 'PERSON_RECEIVED';
export const PERSON_UPDATE_FAILED = 'PERSON_UPDATE_FAILED';

export const PERSON_EDITING_STARTED = 'PERSON_EDITING_STARTED';
export const PERSON_EDITING_CANCELED = 'PERSON_EDITING_CANCELED';

export function peopleRequested() {
  return {
    type: PEOPLE_REQUESTED
  };
}

export function peopleReceived(people) {
  return {
    type: PEOPLE_RECEIVED,
    people
  };
}

export function peopleRequestFailed(error) {
  return {
    type: PEOPLE_REQUEST_FAILED,
    error
  };
}

export const requestPeopleUsing = apiFn => () => {
  return dispatch => {
    dispatch(peopleRequested());
    return apiFn()
      .then(people => dispatch(peopleReceived(people)))
      .catch(error => dispatch(peopleRequestFailed(error)))
  }
}
export const requestPeople = requestPeopleUsing(api.loadPeople);


export function personUpdateRequested(id) {
  return {
    type: PERSON_UPDATE_REQUESTED,
    id
  };
}

export function personReceived(person) {
  return {
    type: PERSON_RECEIVED,
    person
  };
}

export function personUpdateFailed(id, error) {
  return {
    type: PERSON_UPDATE_FAILED,
    id,
    error
  };
}

export const updatePersonUsing = apiFn => (id, patch) => {
  return dispatch => {
    dispatch(personUpdateRequested(id));
    return apiFn(id, patch)
      .then(person => {
        dispatch(personReceived(person));
        return true;
      })
      .catch(error => {
        dispatch(personUpdateFailed(id, error));
        return false;
      })
  }
}
export const updatePerson = updatePersonUsing(api.updatePerson);


export function personEditingStarted(id) {
  return {
    type: PERSON_EDITING_STARTED,
    id
  }
}

export function personEditingCanceled(id) {
  return {
    type: PERSON_EDITING_CANCELED,
    id
  }
}