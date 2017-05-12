import { freeze } from '../../util/freeze'
import { peopleReceived, personReceived } from '../actions';
import reducer from './reducer';

describe('peopleReducer', () => {
  const testPeople = freeze([
    { id: '1', firstname: 'John' },
    { id: '2', firstname: 'Jane' },
    { id: '3', firstname: 'Joe' }
  ]);

  it('should initialize state with people set to an empty array', () => {
    const actualState = reducer(undefined, {});
    expect(actualState).toEqual([]);
  });

  it('should set people array on PEOPLE_RECEIVED', () => {
    const action = peopleReceived(testPeople);
    const actualState = reducer([], action);
    expect(actualState).toEqual(testPeople);
  });

  it('should replace the received person on PERSON_RECEIVED if it already exists', () => {
    const action = personReceived({ id: '2', firstname: 'Jill' });
    const actualState = reducer(testPeople, action);
    const [first, , third] = testPeople;
    expect(actualState).toEqual([first, action.person, third]);
  });

  it('should return the state if PERSON_RECEIVED does not exist', () => {
    const action = personReceived({ id: '4', firstname: 'Jill' });
    const actualState = reducer(testPeople, action); 
    expect(actualState).toBe(testPeople);
  });
});
