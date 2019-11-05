const chai = require('chai');
const expect = chai.expect;

const conventions = require('../../src/conventions/underscore-convention');

describe('Conventions', function () {
    describe('Underscore', function () {
        it('should return true when underscore is in place of camel case', function () {
            const modelProperty = 'someProperty';
            const columnName = 'some_property';

            expect(conventions(modelProperty, columnName)).equal(true);
        });

        it('should return true when column name is already camel cased', function () {
            const modelProperty = 'someProperty';
            const columnName = 'someProperty';

            expect(conventions(modelProperty, columnName)).equal(true);
        });

        it('should return false when the proprty name does not match the column name', function () {
            const modelProperty = 'someDifferentProperty';
            const columnName = 'some_property';

            expect(conventions(modelProperty, columnName)).equal(false);
        });

        it('should return false when there is a trailing underscore', function () {
            const modelProperty = 'someProperty';
            const columnName = 'someProperty_';

            expect(conventions(modelProperty, columnName)).equal(false);
        });

        it('should return false when there are two underscores in a row', function () {
            const modelProperty = 'someProperty';
            const columnName = 'some__Property';

            expect(conventions(modelProperty, columnName)).equal(false);
        });

        it('should return false when there is a leading underscore', function () {
            const modelProperty = 'someProperty';
            const columnName = '_someProperty';

            expect(conventions(modelProperty, columnName)).equal(false);
        });
    });
});