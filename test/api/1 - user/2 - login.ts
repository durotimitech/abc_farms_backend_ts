import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('POST USERS /login', () => {
    // Test case: Login a user successfully
    it('should login a user', (done) => {
        chai
        .request(app)
        .post('/api/users/login')
        .send({
            email: 'admin@gmail.com',
            password: '12345678',
        })
        .end((err, res) => {
            expect(res).to.have.status(StatusCodes.OK);
            done();
        }
    )});

    // Test case: Attempt to login a user with invalid credentials
    it('should return an unauthorized error for invalid credentials', (done) => {
        chai
        .request(app)
        .post('/api/users/login')
        .send({
            email: 'ad@gm.com',
            password:"12345678"
        })
        .end((err, res) => {
            expect(res).to.have.status(StatusCodes.BAD_REQUEST);
            done();
        }
    )});

    // Test case: Attempt to login a user with invalid request body
    it('should return a bad request error for invalid request body', (done) => {
        chai
        .request(app)
        .post('/api/users/login')
        .send({
            email: 'admin@gmail.com',
        })
        .end((err, res) => {
            expect(res).to.have.status(StatusCodes.BAD_REQUEST);
            done();
        }
    )});
});
