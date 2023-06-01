import supertest from 'supertest';
import { expect, assert } from 'chai';
import { StatusCodes } from 'http-status-codes';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import chai from 'chai';
import sinon from 'sinon';
import {User} from '../../../src/api/entities/User';

chai.use(chaiHttp);

const request = supertest('http://localhost:9004/api/users');

describe('POST USERS /register', () => {
  // Test case: Create a new user successfully
  it('should create a new user', (done) => {
    const mockUser = {
      email: 'test@example.com',
      firstname: 'John',
      lastname: 'Doe',
      telephone: '1234567890',
      password: 'password',
    };

    const createUserMock = sinon.stub(User, 'create').returns({
      // @ts-ignore
      save: () => Promise.resolve(),
      });

      request
      .post('/register')
      .send(mockUser)
      .end((err, res) => {
        expect(res).to.have.status(StatusCodes.CREATED);
        expect(createUserMock.calledOnce).to.be.true;
        createUserMock.restore();
        done();
      });
  });

  // Test case: Attempt to create a user with an existing email
  // it('should return a conflict error when email already exists', (done) => {
  //   chai
  //     .request(app)
  //     .post('/api/users')
  //     .send({
  //       email: 'admin@gmail.com', 
  //       firstname: 'Jane',
  //       lastname: 'Smith',
  //       telephone: '9876543210',
  //       password: 'password',
  //     })
  //     .end((err, res) => {
  //       expect(res).to.have.status(StatusCodes.CONFLICT);
  //       done();
  //     });
  // });

  // Test case: Attempt to create a user with invalid request body
  // it('should return a bad request error for invalid request body', (done) => {
  //   chai
  //     .request(app)
  //     .post('/api/users')
  //     .send({
  //       email: 'admin@gmail.com', 
  //       firstname: 'Jane',
  //     })
  //     .end((err, res) => {
  //       expect(res).to.have.status(StatusCodes.BAD_REQUEST);
  //       done();
  //     });
  // });


});
