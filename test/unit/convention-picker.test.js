import chai from 'chai';
import proxyquire from 'proxyquire';

const expect = chai.expect;

describe('Convention picker', () => {
    const underscoreConventionStub = (modelProperty, dbColumnName) => {

    };

    const conventionEnumStub = {
        underscore: 'underscore'
    };

    it('should return the underscore strategy function', () => {
        const strategyPicker = proxyquire('../../src/conventions/convention-picker', {
            './underscore-convention': { 
                default: underscoreConventionStub 
            },
            './../enums/convention-enum': { 
                default: conventionEnumStub 
            }
        }).default;

        expect(strategyPicker(conventionEnumStub.underscore)).to.equal(underscoreConventionStub);
    });

    it('should throw an error if the strategy doesn\'t exist', () => {
        const conventionPicker = proxyquire('../../src/conventions/convention-picker', {
            './underscore-convention': { 
                default: underscoreConventionStub 
            },
            './../enums/convention-enum': { 
                default: conventionEnumStub 
            }
        }).default;

        expect(function () { conventionPicker('not a valid convention') }).to.throw('Not a valid convention');
    });
});