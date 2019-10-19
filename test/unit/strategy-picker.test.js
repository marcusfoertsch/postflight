const chai = require('chai');
const proxyquire = require('proxyquire');

const expect = chai.expect;

describe('Strategy picker', () => {
    const underscoreStrategyStub = (modelProperty, dbColumnName) => {

    };

    const strategyEnumStub = {
        underscore: 'underscore'
    };

    it('should return the underscore strategy function', () => {
        const strategyPicker = proxyquire('../../src/strategies/strategy-picker', {
            './underscore-strategy': underscoreStrategyStub,
            './../enums/strategy-enum': strategyEnumStub
        });

        expect(strategyPicker(strategyEnumStub.underscore)).to.equal(underscoreStrategyStub);
    });

    it('should throw an error if the strategy doesn\'t exist', () => {
        const strategyPicker = proxyquire('../../src/strategies/strategy-picker', {
            './underscore-strategy': underscoreStrategyStub,
            './../enums/strategy-enum': strategyEnumStub
        });

        expect(function () { strategyPicker('not a valid strategy') }).to.throw('Not a valid strategy');
    });
});