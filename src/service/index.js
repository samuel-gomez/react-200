import { updatePerson, fetchPeople } from './peopleBackend'

const updatePersonConfigured = updatePerson(window.fetch);
const fetchPeopleConfigured = fetchPeople(window.fetch);

export {
  updatePersonConfigured as updatePerson,
  fetchPeopleConfigured as fetchPeople
}