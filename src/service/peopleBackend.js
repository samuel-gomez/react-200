export const loadPeople = fetch => async () => {
  const res = await fetch('/api/people');
  return await res.json();
}

export const updatePerson = fetch => async (id, patch) => {
  const patchRes = await fetch(`/api/people/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(patch),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (patchRes.status !== 204) throw patchRes.statusText;
  const loadRes = await fetch(`/api/people/${id}`);
  return await loadRes.json();
}

export default {
  loadPeople: loadPeople(fetch),
  updatePerson: updatePerson(fetch)
};
