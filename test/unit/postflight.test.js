import chai from 'chai';
import proxyquire from 'proxyquire';
const expect = chai.expect;

describe('Postflight', () => {
    const Person = class {
        constructor(
            id = null,
            firstName = null,
            lastName = null,
            birthday = null
        ) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.birthday = birthday;
        }
    };

    let Postflight;
    let ModelSpec;
    let specMap;
    let personSpec;
    let personPropertyMap;

    beforeEach(() => {
        ModelSpec = class {
            constructor(propertyMap, modelClass) {
                this._propertyMap = propertyMap;
                this._modelClass = modelClass;
            }
        };

        Postflight = proxyquire('../../src/postflight', {
            './model-spec': {
                default: ModelSpec 
            }
        }).default;

        specMap = new Map();
        personPropertyMap = new Map();

        personPropertyMap.set('id', 'id');
        personPropertyMap.set('firstName', 'first_name');
        personPropertyMap.set('firstName', 'last_name');
        personPropertyMap.set('birthday', 'birthday');

        personSpec = new ModelSpec(personPropertyMap, Person);

        specMap.set('Person', personSpec);
    });

    it('should create a Postflight object with an empty spec map', () => {
        const postflight = new Postflight();

        expect(postflight instanceof Postflight).to.be.true;
        expect(postflight.specMap instanceof Map).to.be.true;
        expect(postflight.specMap.size).to.be.equal(0);
    });


    it('should create a Postflight object with properties set', () => {
        const postflight = new Postflight(specMap);

        expect(postflight instanceof Postflight).to.be.true;
        expect(postflight.specMap instanceof Map).to.be.true;
        expect(postflight.specMap === specMap).to.be.true;
    });

    it('should add a ModelSpec', () => {
        const postflight = new Postflight();

        const specConfig = {
            name: 'Person',
            propertyMap: personPropertyMap,
            modelClass: Person
        };

        postflight.addSpec(specConfig);

        const specMap = postflight.specMap;

        expect(specMap.get('Person') instanceof ModelSpec).to.be.true;
        expect(specMap.get('Person')._propertyMap).to.equal(personPropertyMap);
        expect(specMap.get('Person')._modelClass).to.equal(Person);
    });

    it('should throw an error when specMap is not a Map object', () => {
        const notSpecMap = [];

        expect(function () { new Postflight(notSpecMap) } ).to.throw('specMap must be a Map object');
    });

    it('should throw an error without a spec name', () => {
        const postflight = new Postflight();

        const specConfig = {
            name: '',
            propertyMap: personPropertyMap,
            modelClass: Person
        };

        expect(function () { postflight.addSpec(specConfig) }).to.throw('Spec must have a name');
    });

    it('should return a ModelSpec', () => {
        const postflight = new Postflight(specMap);

        const modelSpec = postflight.getSpec('Person');
        
        expect(modelSpec instanceof ModelSpec).to.be.true;
        expect(modelSpec).to.equal(personSpec);
    });
});