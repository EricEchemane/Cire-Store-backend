import { expect } from 'chai';
import "mocha";
import Hasher from 'utils/hasher';

context('Hasher class', () => {
    const password = 'mypassword123';
    let hashedPassword: string;

    describe('hash method', () => {
        it('should return a hashed password', () => {
            hashedPassword = Hasher.hash(password);
            expect(hashedPassword).to.be.a('string');
        });
    });
    describe('verify method', () => {
        it('should return true if password is matched', () => {
            expect(Hasher.verify(password, hashedPassword)).to.be.true;
        });
        it('should return false if password is not matched', () => {
            expect(Hasher.verify('thewrongpassword', hashedPassword)).to.be.false;
        });
    });
});