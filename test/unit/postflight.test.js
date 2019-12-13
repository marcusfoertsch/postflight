import chai from 'chai';
import proxyquire from 'proxyquire';
import { ModelSpec, Person } from '../fixtures/classes';
const expect = chai.expect;

describe('Postflight', () => {
    let postflight;
    let personSpec;
    let personPropertyMap;

    beforeEach(() => {
        postflight = proxyquire('../../src/postflight', {
            './model-spec': ModelSpec
        });

        personPropertyMap = new Map([
            ['id', 'id'],
            ['firstName', 'first_name'],
            ['firstName', 'last_name'],
            ['birthday', 'birthday']
        ]);

        personSpec = new ModelSpec(personPropertyMap, Person);

    });

    it('should create a Postflight object with an empty spec map', () => {
        expect(postflight.specMap instanceof Map).to.be.true;
        expect(postflight.specMap.size).to.be.equal(0);
    });

    it('should add a ModelSpec', () => {

        const specConfig = {
            propertyMap: personPropertyMap,
            modelClass: Person
        };

        postflight.addSpec('Person', specConfig);

        const specMap = postflight.specMap;

        expect(specMap.get('Person') instanceof ModelSpec).to.be.true;
        expect(specMap.get('Person').propertyMap).to.equal(personPropertyMap);
        expect(specMap.get('Person').modelClass).to.equal(Person);
    });

    it('should throw an error without a spec name', () => {
        const specConfig = {
            propertyMap: personPropertyMap,
            modelClass: Person
        };

        expect(function () { postflight.addSpec('', specConfig) }).to.throw('Spec must have a name');
    });

    it('should return a ModelSpec', () => {
        const specConfig = {
            propertyMap: personPropertyMap,
            modelClass: Person
        };

        postflight.addSpec('Person', specConfig);

        const modelSpec = postflight.getSpec('Person');
        
        expect(modelSpec instanceof ModelSpec).to.be.true;
        expect(modelSpec.propertyMap).to.equal(specConfig.propertyMap);
        expect(modelSpec.modelClass).to.equal(specConfig.modelClass);
    });
});