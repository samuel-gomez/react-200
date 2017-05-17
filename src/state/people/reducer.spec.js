import { freeze } from '../../util/freeze'
import { peopleReceived, personReceived, personUpdateRequested, personUpdateFailed, personEditingStarted, personEditingCanceled } from '../actions';
import reducer, { mapReducer, allReducer, getFilteredPersonIds } from './reducer';

describe('peopleReducer', () => {
  const testPeople = freeze([
    { id: '1', firstname: 'John', lastname: 'Doe' },
    { id: '2', firstname: 'Jane', lastname: 'Doe' },
    { id: '3', firstname: 'Joe', lastname: 'Doe' }
  ]);

  const peopleMap = freeze({
    '1': { id: '1', firstname: 'John', lastname: 'Doe' },
    '2': { id: '2', firstname: 'Jane', lastname: 'Doe' },
    '3': { id: '3', firstname: 'Joe', lastname: 'Doe' }
  });

  const allIds = freeze(['1', '2', '3']);

  const peopleMapWithEditing = (status) => freeze({
    ...peopleMap,
    '1': {...peopleMap['1'], _editingStatus: status}
  });

  it('should initialize state with an empty map and an empty list', () => {
    const actualState = reducer(undefined, {});
    expect(actualState).toEqual({
      map: {},
      all: []
    });
  });

  describe('mapReducer', () => {
    it('should load people into map on PEOPLE_RECEIVED', () => {
      const action = peopleReceived(testPeople);
      const actualState = mapReducer({}, action);
      expect(actualState).toEqual(peopleMap);
    });

    it('should "upsert" the received person on PERSON_RECEIVED if it already exists', () => {
      const action = personReceived({ id: '2', firstname: 'Jill' });
      const actualState = mapReducer(peopleMap, action);
      expect(actualState).toEqual({
        ...peopleMap,
        [action.person.id]: action.person
      });
    });

    it('should set _editingStatus to EDITING on PERSON_EDITING_STARTED', () => {
      const action = personEditingStarted('1');
      const actualState = mapReducer(peopleMap, action);
      expect(actualState).toEqual(peopleMapWithEditing('EDITING'));
    });

    it('should set _editingStatus to SAVING on PERSON_UPDATE_REQUESTED', () => {
      const action = personUpdateRequested('1');
      const actualState = mapReducer(peopleMap, action);
      expect(actualState).toEqual(peopleMapWithEditing('SAVING'));
    });

    it('should set _editingStatus to EDITING on PERSON_UPDATE_FAILED', () => {
      const action = personUpdateFailed('1');
      const actualState = mapReducer(peopleMap, action);
      expect(actualState).toEqual(peopleMapWithEditing('FAILED'));
    });

    it('should set _editingStatus to undefined on PERSON_EDITING_CANCELED', () => {
      const action = personEditingCanceled('1');
      const actualState = mapReducer(peopleMapWithEditing('EDITING'), action);
      expect(actualState).toEqual(peopleMapWithEditing(undefined));
    });
  });
  
  describe('allReducer', () => {
    it('should set the array of person ids on PEOPLE_RECEIVED', () => {
      const action = peopleReceived(testPeople);
      const actualState = allReducer([], action);
      expect(actualState).toEqual(allIds);
    });

    it('should prepend the received person id if not already in array', () => {
      const action = personReceived({ id: '4', firstname: 'Jill' });
      const actualState = allReducer(allIds, action);
      expect(actualState).toEqual(['4'].concat(allIds));
    });
  });

  describe('getFilteredPersonIds', () => {
    const givenState = {
      map: peopleMap,
      all: allIds
    };

    it('should return all ids if filter is falsy', () => {
      const actual = getFilteredPersonIds(givenState, '');
      expect(actual).toEqual(allIds);
    });

    it('should return found ids', () => {
      const actual = getFilteredPersonIds(givenState, 'n');
      expect(actual).toEqual(['1', '2']);
    });

    it('should return an empty array if none was found', () => {
      const actual = getFilteredPersonIds(givenState, 'X');
      expect(actual).toEqual([]);
    });
  });
});
