const chai = require('chai');
const utils = require('../../src/utils/utils');
const expect = chai.expect;

describe('Utils tests', () => {
    it('should return true when the object is null', () => {
        const obj = null;

        expect(utils.isObjectEmptyOrNull(obj)).to.be.true;
    }),
    it('should return true when the object is empty', () => {
        const obj = {};

        expect(utils.isObjectEmptyOrNull(obj)).to.be.true;
    });

    it('should return false when the object has properties', () => {
        const obj = new Date();

        expect(utils.isObjectEmptyOrNull(obj)).to.be.false;
    });

    it('should return false when the argument is a string', () => {
        const obj = 'this is a string';

        expect(utils.isObjectEmptyOrNull(obj)).to.be.false;
    });

    it('should return false when the argument is a boolean', () => {
        const obj = false;

        expect(utils.isObjectEmptyOrNull(obj)).to.be.false;
    });

    it('should return false when the argument is an array', () => {
        const obj = [];

        expect(utils.isObjectEmptyOrNull(obj)).to.be.false;
    });

    it('should return false when the argument is a map', () => {
        const obj = new Map();

        expect(utils.isObjectEmptyOrNull(obj)).to.be.false;
    });
});

