export async function fetchPeople() {
  const res = await fetch('api/people');
  return await res.json();
}

export async function loadPerson(id) {
  const res = await fetch(`api/people/${id}`);
  return await res.json();
}

export async function updatePerson(id, patch) {
  const result = await fetch(`api/people/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(patch),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (result.status !== 204) throw result.statusText;
  return true;
}
