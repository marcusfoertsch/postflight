const chai = require('chai');

const expect = chai.expect;

const ConventionEnum = require('../../src/enums/convention-enum');

describe('Convention Enum', () => {
    it('underscore property should equal \'underscore\' ', () => {
        expect(ConventionEnum.underscore).to.equal('underscore');
    });

    it('exact property should equal \'exact\'', () => {
        expect(ConventionEnum.exact).to.equal('exact');
    });

    it('should throw an error when modifying an enum property', () => {
        expect(function () { ConventionEnum.exact = 'underscore'} ).to.throw;
    });
});