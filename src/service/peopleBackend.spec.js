import { loadPeople, updatePerson } from './peopleBackend';
import { peopleReceived, personReceived } from '../state/actions';

const testPeople = [
  { id: '1', firstname: 'John' },
  { id: '2', firstname: 'Jane' },
  { id: '3', firstname: 'Joe' }
];
const testPatch = { firstname: 'Jill' };
const testPerson = { id: '1', firstname: 'Jill' };

describe('people backend', () => {

  describe('loadPeople', () => {
    let load;
    let fetchMock;
    let dispatchMock;
    
    beforeEach(() => {
      fetchMock = jest.fn().mockReturnValue(
        Promise.resolve({ json: () => Promise.resolve(testPeople) })
      );
      dispatchMock = jest.fn();
      load = loadPeople(fetchMock)(dispatchMock);
    });
    
    it('should GET people from API', () => {
      load();
      expect(fetchMock).toBeCalledWith('api/people');
    });

    it('should dispatch a peopleReceived action and resolve to null', (done) => {
      load().then(res => {
        expect(dispatchMock).toBeCalledWith(peopleReceived(testPeople));
        expect(res).toBeNull();
        done();
      });
    });

    it('should resolve to some Error when something goes wrong', (done) => {
      fetchMock = jest.fn().mockReturnValue(Promise.reject('some error'));
      load = loadPeople(fetchMock)(dispatchMock);
      load().then(res => {
        expect(res).toEqual('some error');
        done();
      })
    });
  });

  describe('updatePerson', () => {
    let update;
    let fetchMock;
    let dispatchMock;

    beforeEach(() => {
      fetchMock = jest.fn()
        .mockImplementationOnce(
          () => Promise.resolve({ status: 204 })
        )
        .mockImplementationOnce(
          () => Promise.resolve({ json: () => Promise.resolve(testPerson) })
        )
      dispatchMock = jest.fn();
      update = updatePerson(fetchMock)(dispatchMock);
    });

    it('should POST patch to API and load the person', (done) => {
      update(testPerson.id, testPatch)
        .then(() => {
          expect(fetchMock.mock.calls[0]).toEqual([`api/people/${testPerson.id}`, {
            body: JSON.stringify(testPatch),
            headers: expect.any(Object),
            method: 'PATCH'
          }]);
          expect(fetchMock.mock.calls[1]).toEqual([`api/people/${testPerson.id}`]);
          done();
        });
    });

    it('should dispatch personReceived action', (done) => {
      update(testPerson.id, testPatch)
        .then(() => {
          expect(dispatchMock).toBeCalledWith(personReceived(testPerson));
          done();
        })
    });

    it('should resolve to some Error when something goes wrong', (done) => {
      fetchMock = jest.fn().mockReturnValue(Promise.reject('some error'));
      update = updatePerson(fetchMock)(dispatchMock);
      update().then(res => {
        expect(res).toEqual('some error');
        done();
      })
    });    
  });
});