import { freeze } from '../../util/freeze'
import { peopleReceived, personReceived } from '../actions';
import rootReducer, { mapReducer, allReducer } from './reducer';

const testPeople = freeze([
  { id: '1', firstname: 'John' },
  { id: '2', firstname: 'Jane' },
  { id: '3', firstname: 'Joe' }
]);

const testMap = {
  '1': testPeople[0],
  '2': testPeople[1],
  '3': testPeople[2]  
};

const testAll = ['1', '2', '3'];

describe('mapReducer', () => {
  it('should initialize state with an empty map', () => {
    const actualState = mapReducer(undefined, {});
    expect(actualState).toEqual({});
  });

  it('should build the map on PEOPLE_RECEIVED', () => {
    const action = peopleReceived(testPeople);
    const actualState = mapReducer({}, action);
    expect(actualState).toEqual(testMap);
  });

  it('should replace the received person on PERSON_RECEIVED if it already exists', () => {
    const action = personReceived({ id: '2', firstname: 'Jill' });
    const actualState = mapReducer(testMap, action);
    expect(actualState).toEqual({
      ...testMap,
      '2': { id: '2', firstname: 'Jill' }
    });
  });

  it('should add the received person on PERSON_RECEIVED does not exist', () => {
    const action = personReceived({ id: '4', firstname: 'Jill' });
    const actualState = mapReducer(testMap, action); 
    expect(actualState).toEqual({
      ...testMap,
      '4': { id: '4', firstname: 'Jill' }
    });
  });
});

describe('allReducer', () => {
  it('should initialize state with an empty list', () => {
    const actualState = allReducer(undefined, {});
    expect(actualState).toEqual([]);
  });

  it('should build the array of ids on PEOPLE_RECEIVED', () => {
    const action = peopleReceived(testPeople);
    const actualState = allReducer([], action);
    expect(actualState).toEqual(testAll);
  });

  it('should do nothing on PERSON_RECEIVED if it already exists', () => {
    const action = personReceived({ id: '2', firstname: 'Jill' });
    const actualState = allReducer(testAll, action);
    expect(actualState).toBe(testAll);
  });

  it('should prepend the id on PERSON_RECEIVED if the person does not exist', () => {
    const action = personReceived({ id: '4', firstname: 'Jill' });
    const actualState = allReducer(testAll, action); 
    expect(actualState).toEqual(['4', ...testAll]);
  });
});

describe('peopleReducer', () => {
  it('should initialize to an object with expected keys', () => {
    const actualState = rootReducer(undefined, {});
    expect(actualState).toEqual({
      map: expect.anything(),
      all: expect.anything()
    })
  });
});
