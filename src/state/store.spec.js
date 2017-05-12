import { rootReducer } from './store';

describe('rootReducer', () => {
  it('should initialize to an object with expected keys', () => {
    const actualState = rootReducer(undefined, {});
    expect(actualState).toEqual({
      people: expect.anything(),
      search: expect.anything(),
      discover: expect.anything()
    })
  });
});