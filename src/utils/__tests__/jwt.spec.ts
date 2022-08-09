import "mocha";
import { expect } from 'chai';
import Jwt from "utils/jwt";
import environment from "utils/environment";

context('Jwt class', () => {
    const payload = { name: 'eric' };

    describe('sign method', () => {
        it('should return a token', () => {
            const token = Jwt.sign(payload, environment.secret);
            expect(token).to.be.a('string');
        });
    });
    describe('verify method', () => {
        let token = Jwt.sign(payload, environment.secret);

        it('should return the payload if token is valid', () => {
            expect(Jwt.verify(token, environment.secret)).to.have.property('name', 'eric');
        });
        it('should return false if token is not valid', () => {
            expect(() => {
                Jwt.verify(token, 'wrongsecret');
            }).to.throw();
        });
    });
});