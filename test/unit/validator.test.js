import chai from 'chai';
import proxyquire from 'proxyquire';

const expect = chai.expect;

describe('Validator', () => {
    it('should throw if model definition is null', () => {
        const utilStub = {
            isObjectEmptyOrNull: (obj) => {
                return true;
            }
        };

        const validator = proxyquire('../../src/validator/validator', {
            '../utils/utils': utilStub
        });

        const expected = function() { 
            validator.modelDefinition(null); 
        };

        expect(expected).to.throw('No model definition provided');
    });

    it('should throw if model definition is an empty object', () => {
        const utilStub = {
            isObjectEmptyOrNull: (obj) => {
                return true;
            }
        };

        const validator = proxyquire('../../src/validator/validator', {
            '../utils/utils': utilStub
        });

        const expected = function() { 
            validator.modelDefinition({}); 
        };

        expect(expected).to.throw('No model definition provided');
    });

    it('should throw if rows is null', () => {
        const utilStub = {
            isObjectEmpty: (obj) => {
                return false;
            }
        };

        const validator = proxyquire('../../src/validator/validator', {
            '../utils/utils': utilStub
        });

        const expected = function () { 
            validator.rows(null); 
        }; 

        expect(expected).to.throw('No rows provided.');
    });

    it('should throw if rows is empty', () => {
        const utilStub = {
            isObjectEmptyOrNull: (obj) => {
                return false;
            }
        };

        const validator = proxyquire('../../src/validator/validator', {
            '../utils/utils': utilStub
        });

        const expected = function () { 
            validator.rows([]); 
        };

        expect(expected).to.throw('No rows provided.');
    });

    it('should return if rows is valid', () => {
        const utilStub = {
            isObjectEmpty: (obj) => {
                return false;
            }
        };

        const validator = proxyquire('../../src/validator/validator', {
            '../utils/utils': utilStub
        });

        const rows = [
            {
                a_property: 'Some stuff'
            }
        ];

        const expected = function() { 
            validator.rows(rows); 
        };

        expect(expected).not.to.throw();
    });

    it('should return if modelDefinition is valid', () => {
        const utilStub = {
            isObjectEmptyOrNull: (obj) => {
                return false;
            }
        };

        const validator = proxyquire('../../src/validator/validator', {
            '../utils/utils': utilStub 
        });

        const modelDefinition = {
            aProperty: 'Some stuff'
        };

        const expected = function() { 
            validator.modelDefinition(modelDefinition); 
        }; 

        expect(expected).not.to.throw();
    });
});