import { freeze } from '../util/freeze'
import { people, search, discover } from './reducer';
import {
  peopleReceived,
  personReceived,
  searchChanged,
  discoverNext,
  discoverPrev
} from './actions';

describe('peopleReducer', () => {
  const testPeople = freeze([
    { id: '1', firstname: 'John' },
    { id: '2', firstname: 'Jane' },
    { id: '3', firstname: 'Joe' }
  ]);

  it('should initialize state with people set to an empty array', () => {
    const actualState = people(undefined, {});
    expect(actualState).toEqual([]);
  });

  it('should set people array on PEOPLE_RECEIVED', () => {
    const action = peopleReceived(testPeople);
    const actualState = people([], action);
    expect(actualState).toEqual(testPeople);
  });

  it('should replace the received person on PERSON_RECEIVED if it already exists', () => {
    const action = personReceived({ id: '2', firstname: 'Jill' });
    const actualState = people(testPeople, action);
    const [first, , third] = testPeople;
    expect(actualState).toEqual([first, action.person, third]);
  });

  it('should return the state if PERSON_RECEIVED does not exist', () => {
    const action = personReceived({ id: '4', firstname: 'Jill' });
    const actualState = people(testPeople, action); 
    expect(actualState).toBe(testPeople);
  });
});

describe('searchReducer', () => {
  it('should initialize state with search set to an empty string', () => {
    const actualState = search(undefined, {});
    expect(actualState).toEqual('');
  });

  it('should replace search with the string in SEARCH_CHANGED action', () => {
    const action = searchChanged('test');
    const actualState = search('anything', action);
    expect(actualState).toEqual('test');
  });
});

describe('discoverReducer', () => {
  it('should initialize state with discover set to [null, 0]', () => {
    const actualState = discover(undefined, {});
    expect(actualState).toEqual([null, 0]);
  });

  it('should set discover to the first index when people are received and remember the length', () => {
    const actualState = discover([null, 0], peopleReceived([{id:1}, {id:2}, {id:3}]));
    expect(actualState).toEqual([0, 3]);
  });
  
  it('should set discover to the next index on DISCOVER_NEXT', () => {
    const action = discoverNext();
    const actualState = discover([0, 3], action);
    expect(actualState).toEqual([1, 3]);
  });

  it('should set discover to the previous index on DISCOVER_PREV', () => {
    const action = discoverPrev();
    const actualState = discover([0, 3], action);
    expect(actualState).toEqual([2, 3]);
  });
});
