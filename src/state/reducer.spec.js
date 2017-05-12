import { search, discover } from './reducer';
import {
  searchChanged,
  discoverNextOf,
  discoverPrevOf
} from './actions';

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
    expect(actualState).toEqual(0);
  });
  
  it('should set discover to the next index on DISCOVER_NEXT', () => {
    const action = discoverNextOf(3);
    const actualState = discover(0, action);
    expect(actualState).toEqual(1);
  });

  it('should set discover to the previous index on DISCOVER_PREV', () => {
    const action = discoverPrevOf(3);
    const actualState = discover(0, action);
    expect(actualState).toEqual(2);
  });
});
