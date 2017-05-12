import { DISCOVER_NEXT, DISCOVER_PREV, discoverNext, discoverPrev } from './actions';

describe('discover actions', () => {
  const dispatch = jest.fn();
  const getState = () => ({
    people: [{id:1}, {id:2}, {id:3}]
  });

  test('discoverNext should dispatch DISCOVER_NEXT with the length of people array', () => {
    const thunk = discoverNext();
    thunk(dispatch, getState);
    expect(dispatch).toBeCalledWith({
      type: DISCOVER_NEXT,
      of: 3
    });
  });

  test('discoverPrev should dispatch DISCOVER_PREV with the length of people array', () => {
    const thunk = discoverPrev();
    thunk(dispatch, getState);
    expect(dispatch).toBeCalledWith({
      type: DISCOVER_PREV,
      of: 3
    });
  });
});