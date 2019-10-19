const chai = require('chai');
const modelFactory = require('../../src/model-factory');

const expect = chai.expect;

describe('Model Factory', function() {

    it ('should return a model', () => {

        const modelDefinition = {
            id: 'number',
            firstName: 'string',
            lastName: 'string',
            birthday: 'date'
        };

        const propertyMap = new Map();
        propertyMap.set('id', 'id');
        propertyMap.set('firstName', 'first_name');
        propertyMap.set('lastName', 'last_name');
        propertyMap.set('birthday', 'birthday');

        const row = {
            id: 1,
            first_name: 'John',
            last_name: 'Wick',
            birthday: new Date('1964-09-02')
        };

        const expectedModel = {
            id: 1,
            firstName: 'John',
            lastName: 'Wick',
            birthday: new Date('1964-09-02')
        };

        const actualModel = modelFactory.create(propertyMap, row);

        expect(actualModel.id).to.equal(1);
        expect(actualModel.firstName).to.equal('John');
        expect(actualModel.lastName).to.equal('Wick');
        expect(actualModel.birthday).to.deep.equal(new Date('1964-09-02'));
    });

    it('should create a Person', () => {        
        const modelDefinition = {
            id: 'number',
            firstName: 'string',
            lastName: 'string',
            birthday: 'date'
        };

        const propertyMap = new Map();
        propertyMap.set('id', 'id');
        propertyMap.set('firstName', 'first_name');
        propertyMap.set('lastName', 'last_name');
        propertyMap.set('birthday', 'birthday');

        const Person = class {
            constructor(id = null, firstName = null, lastName = null, birthday = null) {
                this.id = id;
                this.firstName = firstName;
                this.lastName = lastName;
                this.birthday = birthday;
            }
        };

        const row = {
            id: 1,
            first_name: 'John',
            last_name: 'Wick',
            birthday: new Date('1964-09-02')
        };

        const expectedModel = new Person(
            1,
            'John',
            'Wick',
            new Date('1964-09-02')
        );

        const actualModel = modelFactory.create(propertyMap, row, Person);

        expect(actualModel).to.deep.equal(expectedModel);
        expect(actualModel instanceof Person).to.equal(true);
    });
});