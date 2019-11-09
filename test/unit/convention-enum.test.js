import chai from 'chai';
import ConventionEnum from '../../src/enums/convention-enum';

const expect = chai.expect;


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