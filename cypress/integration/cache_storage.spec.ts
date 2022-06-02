import {CacheStorage} from '../../src/storage/CacheStorage';

type TestObject = {
    name: string,
    age: number,
    country: string
};

const COMMON_KEY = "common.key";
const TEST_OBJECT: TestObject = {
    name: 'Stepan',
    age: 23,
    country: 'Russia'
};

const CACHE_STORAGE = new CacheStorage('http://example.ru');
describe('Cache storage tests', () => {
    afterEach(() => {
        cy.wrap(null).then(() => {
            return CACHE_STORAGE.clear();
        });
    });

    it('Put object and get it back', () => {
        cy.wrap(null).then(() => {
            return CACHE_STORAGE.put(COMMON_KEY, TEST_OBJECT)
                .then(() => CACHE_STORAGE.get<TestObject>(COMMON_KEY))
                .then((obj) => expect(isEqual(TEST_OBJECT, obj)).to.be.true);
        });
    });

    it("Put object and delete it", () => {
        cy.wrap(null).then(() => {
            return CACHE_STORAGE.put(COMMON_KEY, TEST_OBJECT)
                .then(() => CACHE_STORAGE.get<TestObject>(COMMON_KEY))
                .then((obj) => expect(obj).to.be.not.null)
                .then(() => CACHE_STORAGE.delete(COMMON_KEY))
                .then(() => CACHE_STORAGE.get<TestObject>(COMMON_KEY))
                .then((obj) => expect(obj).to.be.null)
        });
    });

    it("Put object and replace it", () => {
        const replaceObj = {
            name: 'Sergey',
            age: 21,
            country: 'Ukraine'
        };

        cy.wrap(null).then(() => {
            return CACHE_STORAGE.put(COMMON_KEY, TEST_OBJECT)
                .then(() => CACHE_STORAGE.get<TestObject>(COMMON_KEY))
                .then((obj) => expect(isEqual(TEST_OBJECT, obj)).to.be.true)
                .then(() => CACHE_STORAGE.put(COMMON_KEY, replaceObj))
                .then(() => CACHE_STORAGE.get<TestObject>(COMMON_KEY))
                .then((obj) => expect(isEqual(replaceObj, obj)).to.be.true);
        });
    });

    it ("Put object and use clear", () => {
        cy.wrap(null).then(() => {
            return CACHE_STORAGE.put(COMMON_KEY, TEST_OBJECT)
                .then(() => CACHE_STORAGE.get<TestObject>(COMMON_KEY))
                .then((obj) => expect(isEqual(TEST_OBJECT, obj)).to.be.true)
                .then(() => CACHE_STORAGE.clear())
                .then(() => CACHE_STORAGE.get<TestObject>(COMMON_KEY))
                .then((obj) => expect(obj).to.be.null)
        });
    });
});

function isEqual(expected: TestObject, actual: TestObject | null): boolean {
    if (actual === null) {
        return false;
    }

    return expected.name === actual.name
        && expected.age === actual.age
        && expected.country === actual.country;
}