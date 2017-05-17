import { loadPeople, updatePerson } from './peopleBackend';

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
    
    beforeEach(() => {
      fetchMock = jest.fn().mockReturnValue(
        Promise.resolve({ json: () => Promise.resolve(testPeople) })
      );
      load = loadPeople(fetchMock);
    });
    
    it('should GET people from API', () => {
      load();
      expect(fetchMock).toBeCalledWith('api/people');
    });

    it('should resolve to people array', (done) => {
      load().then(res => {
        expect(res).toEqual(testPeople);
        done();
      });
    });

    it('should reject with some Error when something goes wrong', (done) => {
      fetchMock = jest.fn().mockReturnValue(Promise.reject('some error'));
      load = loadPeople(fetchMock);
      load().catch(error => {
        expect(error).toEqual('some error');
        done();
      })
    });
  });

  describe('updatePerson', () => {
    let update;
    let fetchMock;

    beforeEach(() => {
      fetchMock = jest.fn()
        .mockImplementationOnce(
          () => Promise.resolve({ status: 204 })
        )
        .mockImplementationOnce(
          () => Promise.resolve({ json: () => Promise.resolve(testPerson) })
        )
      update = updatePerson(fetchMock);
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

    it('should resolve with person received', (done) => {
      update(testPerson.id, testPatch)
        .then(person => {
          expect(person).toEqual(testPerson);
          done();
        })
    });

    it('should reject with some Error when something goes wrong', (done) => {
      fetchMock = jest.fn().mockReturnValue(Promise.reject('some error'));
      update = updatePerson(fetchMock);
      update().catch(error => {
        expect(error).toEqual('some error');
        done();
      })
    });    
  });
});