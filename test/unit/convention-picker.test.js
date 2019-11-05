const chai = require('chai');
const proxyquire = require('proxyquire');

const expect = chai.expect;

describe('Convention picker', () => {
    const underscoreConventionStub = (modelProperty, dbColumnName) => {

    };

    const conventionEnumStub = {
        underscore: 'underscore'
    };

    it('should return the underscore strategy function', () => {
        const strategyPicker = proxyquire('../../src/conventions/convention-picker', {
            './underscore-convention': underscoreConventionStub,
            './../enums/convention-enum': conventionEnumStub
        });

        expect(strategyPicker(conventionEnumStub.underscore)).to.equal(underscoreConventionStub);
    });

    it('should throw an error if the strategy doesn\'t exist', () => {
        const conventionPicker = proxyquire('../../src/conventions/convention-picker', {
            './underscore-convention': underscoreConventionStub,
            './../enums/convention-enum': conventionEnumStub
        });

        expect(function () { conventionPicker('not a valid convention') }).to.throw('Not a valid convention');
    });
});