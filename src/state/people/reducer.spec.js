import { freeze } from '../../util/freeze'
import { peopleReceived, personReceived } from '../actions';
import reducer, { mapReducer, allReducer } from './reducer';

describe('peopleReducer', () => {
  const testPeople = freeze([
    { id: '1', firstname: 'John' },
    { id: '2', firstname: 'Jane' },
    { id: '3', firstname: 'Joe' }
  ]);

  const peopleMap = freeze({
    '1': { id: '1', firstname: 'John' },
    '2': { id: '2', firstname: 'Jane' },
    '3': { id: '3', firstname: 'Joe' }
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
  });
  
  describe('allReducer', () => {
    it('should set the array of person ids on PEOPLE_RECEIVED', () => {
      const action = peopleReceived(testPeople);
      const actualState = allReducer([], action);
      expect(actualState).toEqual(['1', '2', '3']);
    });

    it('should prepend the received person id if not already in array', () => {
      const action = personReceived({ id: '4', firstname: 'Jill' });
      const actualState = allReducer(['1', '2', '3'], action);
      expect(actualState).toEqual(['4', '1', '2', '3']);
    })
  });
});
