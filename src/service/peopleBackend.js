import { peopleReceived, personReceived } from '../state/actions';

export const loadPeople = fetch => dispatch => async () => {
  try {
    const res = await fetch('api/people');
    const people = await res.json();
    dispatch(peopleReceived(people));
    return null;
  } catch (err) {
    return err;
  }
}

export const updatePerson = fetch => dispatch => async (id, patch) => {
  try {
    const patchRes = await fetch(`api/people/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(patch),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (patchRes.status !== 204) throw patchRes.statusText;
    const loadRes = await fetch(`api/people/${id}`);
    const person = await loadRes.json();
    dispatch(personReceived(person));
    return null;
  } catch (err) {
    return err;
  }
}

export default {
  loadPeople: loadPeople(fetch),
  updatePerson: updatePerson(fetch)
};
