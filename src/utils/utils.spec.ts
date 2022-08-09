import 'mocha';
import { expect } from 'chai';
import { isValidEmail, lengthOf, isAllNumeric } from './validators';

describe('validators', () => {
    context('isValidEmail', () => {
        it('should return true for valid emails', () => {
            expect(isValidEmail('name@example.com')).to.be.true;
        });
        it('should return false for invalid emails', () => {
            expect(isValidEmail('nameexample.com')).to.be.false;
        });
    });

    context('lengthOf', () => {
        it('should return true for a string with length 4', () => {
            expect(lengthOf('eric').is(4)).to.be.true;
        });
        it('should return false for a string with length not equal to 4', () => {
            expect(lengthOf('kenneth').isNot(4)).to.be.true;
        });
        it('should return true for a string with length less than 10', () => {
            expect(lengthOf('eric').isLessThan(10)).to.be.true;
        });
        it('should return true for a string with length greater than 5', () => {
            expect(lengthOf('echemane').isGreaterThan(5)).to.be.true;
        });
        it('should return true for a string with spaces and with length of 5', () => {
            expect(lengthOf('eri c', false).is(5)).to.be.true;
        });
    });

    context('isAllNumeric', () => {
        it('should return true for a string with only numbers', () => {
            expect(isAllNumeric('12345')).to.be.true;
        }).timeout(1000);
        it('should return false for a string with letters', () => {
            expect(isAllNumeric('abcde')).to.be.false;
        }).timeout(1000);
    });
});