const chai = require('chai');

const expect = chai.expect;

const StrategyEnum = require('./../../src/enums/strategy-enum');

describe('Strategy Enum', () => {
    it('underscore property should equal \'underscore\' ', () => {
        expect(StrategyEnum.underscore).to.equal('underscore');
    });

    it('exact property should equal \'exact\'', () => {
        expect(StrategyEnum.exact).to.equal('exact');
    });

    it('should throw an error when modifying an enum property', () => {
        expect(function () { StrategyEnum.exact = 'underscore'} ).to.throw;
    });
});