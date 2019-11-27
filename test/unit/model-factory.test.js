import chai from 'chai';
import modelFactory from '../../src/model-factory';
import { Person } from '../fixtures/classes';
import { johnWickRow } from '../fixtures/rows';

const expect = chai.expect;

describe('Model Factory', function() {

    it ('should return a model', () => {

        const modelDefinition = {
            id: 'number',
            firstName: 'string',
            lastName: 'string',
            birthday: 'date'
        };

        const propertyMap = new Map([
            ['id', 'id'],
            ['firstName', 'first_name'],
            ['lastName', 'last_name'],
            ['birthday', 'birthday']
        ]);

        const actualModel = modelFactory.create(propertyMap, johnWickRow);

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

        const expectedModel = new Person(
            1,
            'John',
            'Wick',
            new Date('1964-09-02')
        );

        const actualModel = modelFactory.create(propertyMap, johnWickRow, Person);

        expect(actualModel).to.deep.equal(expectedModel);
        expect(actualModel instanceof Person).to.equal(true);
    });
});