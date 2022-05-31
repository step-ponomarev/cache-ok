import {CacheStorage} from '../../src/storage/CacheStorage';

const EXAMPLE_URL = 'http://example.ru';

type TestObject = {
    name: string,
    age: number,
    country: string
};

describe.only('Cache storage tests', () => {
    it('Put object and get it back', () => {
        const testObject: TestObject = {
            name: 'Stepan',
            age: 18,
            country: 'Russia'
        }
        const testKey = 'stepan';
        const cacheStorage = new CacheStorage(EXAMPLE_URL);

        cy.wrap(null).then(() => {
            return cacheStorage.put(testKey, testObject)
                .then(() => cacheStorage.get<TestObject>(testKey))
                .then((obj) => {
                    expect(obj?.name).equal(testObject.name);
                    expect(obj?.age).equal(testObject.age);
                    expect(obj?.country).equal(testObject.country);
                });
        });
    });
})