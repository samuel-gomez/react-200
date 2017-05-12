import { discoverNextOf, discoverPrevOf } from '../actions';
import reducer from './reducer';

describe('discoverReducer', () => {
  it('should initialize state with discover set to [null, 0]', () => {
    const actualState = reducer(undefined, {});
    expect(actualState).toEqual(0);
  });
  
  it('should set discover to the next index on DISCOVER_NEXT', () => {
    const action = discoverNextOf(3);
    const actualState = reducer(0, action);
    expect(actualState).toEqual(1);
  });

  it('should set discover to the previous index on DISCOVER_PREV', () => {
    const action = discoverPrevOf(3);
    const actualState = reducer(0, action);
    expect(actualState).toEqual(2);
  });
});
