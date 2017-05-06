const fetchPeople = dispatch => async () => {
  try {
    const res = await fetch('api/people');
    const people = await res.json();
    dispatch({ type: 'PEOPLE_RECEIVED', people });
  } catch (e) {
    console.error('could not fetch people :(', e);
  }
}

const updatePerson = dispatch => async (id, patch) => {
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
    dispatch({ type: 'PERSON_RECEIVED', person });
    return true;
  } catch (e) {
    console.error('could not save person :(', e);
    return false;
  }
}

export { fetchPeople, updatePerson };
