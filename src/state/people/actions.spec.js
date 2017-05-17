import {
  peopleRequested,
  peopleReceived,
  peopleRequestFailed,
  requestPeopleUsing
} from './actions';

describe('peopleRequested', () => {
  const testPeople = [
    { id: '1', firstname: 'John', lastname: 'Doe' },
    { id: '2', firstname: 'Jane', lastname: 'Doe' },
    { id: '3', firstname: 'Joe', lastname: 'Doe' }
  ];
  
  let loadPeopleSucceed;
  let loadPeopleFail;
  let dispatch;

  beforeEach(() => {
    loadPeopleSucceed = jest.fn(() => Promise.resolve(testPeople));
    loadPeopleFail = jest.fn(() => Promise.reject('some error'));
    dispatch = jest.fn();
  });
  
  it('should dispatch PEOPLE_REQUESTED synchronously when called', () => {
    const requestPeople = requestPeopleUsing(loadPeopleSucceed);
    const thunk = requestPeople();
    thunk(dispatch);
    expect(dispatch.mock.calls[0]).toEqual([peopleRequested()]);
  });

  it('should dispatch PEOPLE_RECEIVED when the api returns successfully', (done) => {
    const requestPeople = requestPeopleUsing(loadPeopleSucceed);
    const thunk = requestPeople();
    thunk(dispatch)
      .then(() => {
        expect(dispatch.mock.calls[1]).toEqual([peopleReceived(testPeople)]);
        done();
      });
  });

  it('should dispatch PEOPLE_REQUEST_FAILED when the api call fails', (done) => {
    const requestPeople = requestPeopleUsing(loadPeopleFail);
    const thunk = requestPeople();
    thunk(dispatch)
      .then(() => {
        expect(dispatch.mock.calls[1]).toEqual([peopleRequestFailed('some error')]);
        done();
      });
  });
});
