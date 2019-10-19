const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;



describe('Model Spec tests', () => {

    const personPropertyMap = new Map();
    personPropertyMap.set('id', 'id');
    personPropertyMap.set('firstName', 'first_name');
    personPropertyMap.set('lastName', 'last_name');
    personPropertyMap.set('birthday', 'birthday');

    const Person = class {
        constructor(id, firstName, lastName, birthday) {
            this._id = id;
            this._firstName = firstName;
            this._lastName = lastName;
            this._birthday = birthday;
        }
    };

    it('should create a model spec', () => {
        const modelFactoryStub = {
            create: (propertyMap, row, modelClass = null) => {

            } 
        };

        const ModelSpec = proxyquire('../../src/model-spec', {
            './model-factory': modelFactoryStub
        });

        const personSpec = new ModelSpec(personPropertyMap, Person);

        

        expect(personSpec._propertyMap).to.be.equal(personPropertyMap);
        expect(personSpec._modelClass).to.be.equal(Person);
    });

    // TODO: Spy on modelFactory to test calling arguments?
    it('should return the model', () => {
        const personDb = [{
            id: 0,
            first_name: 'John',
            last_name: 'Rambo',
            birthday: new Date('1949-04-15')
        }];
        
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
        const modelClass = personSpec._modelClass;
        const isEmptyObject = Object.entries(modelClass).length === 0 && modelClass.constructor === Object;

        expect(isEmptyObject).to.be.true;
    });
    // TODO: Test without a class provided
});

