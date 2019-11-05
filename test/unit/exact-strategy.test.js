const chai = require('chai');

const expect = chai.expect;

const exactConvention = require('../../src/conventions/exact-convention');

describe('Exact convention', () => {
    it('should return true if the names match', () => {
        expect(exactConvention('name', 'name')).to.be.true;
    });

    it('should return false if the names don\'t match', () => {
        expect(exactConvention('name', 'notName')).to.be.false;
    });

    // TODO: Test differing cases
});