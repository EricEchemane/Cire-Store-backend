import { app, server } from "index";
import request from 'supertest';

afterAll(done => {
    server.close(done);
});

describe('/user', () => {

    describe('post /user', () => {
        it('should create a user', async () => {
            const response = await request(app)
                .post('/user')
                .send({
                    name: 'test',
                    email: ''
                });
            expect(response.status).toBe(200);
        });
    });
});