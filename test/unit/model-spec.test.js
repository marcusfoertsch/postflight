import proxyquire from 'proxyquire';
import chai from 'chai';
import { Person } from '../fixtures/classes';
import { johnRamboRow } from '../fixtures/rows';
const expect = chai.expect;



describe('Model Spec tests', () => {

    const personPropertyMap = new Map([
        ['id', 'id'],
        ['firstName', 'first_name'],
        ['lastName', 'last_name'],
        ['birthday', 'birthday']
    ]);

    it('should create a model spec', () => {
        const modelFactoryStub = {
            create: (propertyMap, row, modelClass = null) => {

            } 
        };

        const ModelSpec = proxyquire('../../src/model-spec', {
            './model-factory': modelFactoryStub
        });

        const personSpec = new ModelSpec(personPropertyMap, Person);

        

        expect(personSpec.propertyMap).to.be.equal(personPropertyMap);
        expect(personSpec.modelClass).to.be.equal(Person);
    });

    it('should return the model', () => {
        const personDb = [ johnRamboRow ];
        
        const modelFactoryStub = {
            create: (propertyMap, row, modelClass = null) => {
                if (propertyMap === personPropertyMap && row === personDb[0] && modelClass === Person) {
                    return new Person(0, 'John', 'Rambo', new Date('1949-04-15'));
                }
            } 
        };

        const ModelSpec = proxyquire('../../src/model-spec', {
            './model-factory': modelFactoryStub
        });

        const expectedPerson = new Person(0, 'John', 'Rambo', new Date('1949-04-15'));

        const personSpec = new ModelSpec(personPropertyMap, Person);
        const modelArray = personSpec
            .getModels(personDb);

        expect(modelArray[0]).to.deep.equal(expectedPerson);
        expect(modelArray[0] instanceof Person).to.be.true;
    });

    it('should set modelClass to an empty object if one is not provided', () => {
        const modelFactoryStub = {
            create: (propertyMap, row, modelClass = null) => {
                
            } 
        };

        const ModelSpec = proxyquire('../../src/model-spec', {
            './model-factory': modelFactoryStub
        });

        const personSpec = new ModelSpec(personPropertyMap);
        const modelClass = personSpec.modelClass;
        const isEmptyObject = Object.entries(modelClass).length === 0 && modelClass.constructor === Object;

        expect(isEmptyObject).to.be.true;
    });
});

