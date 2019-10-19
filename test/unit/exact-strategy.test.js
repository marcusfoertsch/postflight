const chai = require('chai');

const expect = chai.expect;

const exactStrategy = require('../../src/strategies/exact-strategy');

describe('Exact strategy', () => {
    it('should return true if the names match', () => {
        expect(exactStrategy('name', 'name')).to.be.true;
    });

    it('should return false if the names don\'t match', () => {
        expect(exactStrategy('name', 'notName')).to.be.false;
    });

    // TODO: Test differing cases
});