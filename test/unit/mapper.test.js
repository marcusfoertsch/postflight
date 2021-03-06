import chai from 'chai';
import mapper from '../../src/mapper';
import { Person } from '../fixtures/classes';

const expect = chai.expect;

describe('Mapper', function () {
    it('should return a Map with property and column names', () =>  {
        const underscoreStub = function (propertyName, columnName) {
            if (propertyName === 'id' && columnName === 'id') {
                return true;
            } else if (propertyName === 'firstName' && columnName === 'first_name') {
                return true;
            } else if (propertyName === 'lastName' && columnName === 'last_name') {
                return true;
            } else if (propertyName === 'birthday' && columnName === 'birthday') {
                return true;
            } else {
                return false;
            }
        };

        const row = {
            id: 1,
            first_name: 'John',
            last_name: 'Wick',
            birthday: new Date('1964-09-02')
        };

        const person = new Person(0, 'John', 'Wick', new Date('1964-09-02'));

        const modelMapping = mapper.getMapping(person, row, underscoreStub);

        expect(modelMapping.get('id')).equal('id');
        expect(modelMapping.get('firstName')).equal('first_name');
        expect(modelMapping.get('lastName')).equal('last_name');
        expect(modelMapping.get('birthday')).equal('birthday');
    });

    it('throw if a column name does not fit the strategy', () => {
        const strategiesStub = function (propertyName, columnName) {
            if (propertyName === 'id' && columnName === 'id') {
                return true;
            } else if (propertyName === 'firstName' && columnName === 'first_name') {
                return true;
            } else if (propertyName === 'lastName' && columnName === 'last_name') {
                return true;
            } else if (propertyName === 'birthday' && columnName === 'birthday') {
                return true;
            } else {
                return false;
            }
        };

        const row = {
            id: 1,
            firstname: 'John',
            last_name: 'Wick',
            birthday: new Date('1964-09-02')
        };

        const person = new Person(0, 'John', 'Wick', new Date('1964-09-02'));

        expect(function () {mapper.getMapping(person, row, strategiesStub) }).to.throw('Column name does not fit strategy');
    });
});