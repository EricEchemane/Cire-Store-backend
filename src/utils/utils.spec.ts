import 'mocha';
import { expect } from 'chai';

import User from '@entities/user.entity';

describe('User', () => {
    it('should create a new user', () => {
        const user = new User();
        expect(user).to.be.an.instanceOf(User);
    });
});