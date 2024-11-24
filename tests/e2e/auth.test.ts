import request from 'supertest';
import { app } from '../../src/app';
import { RegisterUserDto } from '../../src/types/users.types';
import { testDbCleanup, testDbConnect } from '../../src/test/utils';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

let db: typeof mongoose;

describe('User register and auth', () => {
  beforeAll(async () => {
    db = await testDbConnect();
  });

  afterAll(async () => {
    await testDbCleanup(db);
  });

  const registerDto: RegisterUserDto = {
    email: 'johndoe@gmail.com',
    password: '1234',
    firstName: 'John',
    lastName: 'Doe',
  };

  describe('POST /auth/register', () => {
    it('should register user and return 200', async () => {
      const { body, status } = await request(app)
        .post('/auth/register')
        .send(registerDto);
      expect(status).toBe(200);
      expect(body).toEqual(
        expect.objectContaining({
          email: registerDto.email,
          firstName: registerDto.firstName,
          lastName: registerDto.lastName,
        })
      );
      const validPassword = bcrypt.compareSync(
        registerDto.password,
        body.password
      );
      expect(validPassword).toBe(true);
    });

    it('should fail to register user and return 400', async () => {
      const { status, body } = await request(app)
        .post('/auth/register')
        .send(registerDto);
      expect(status).toBe(400);
      expect(body.message).toBe('User exists!');
    });
  });

  describe('POST /auth/login', () => {
    it('should login user and return 200', async () => {
      const { body, status } = await request(app).post('/auth/login').send({
        email: registerDto.email,
        password: registerDto.password,
      });
      expect(status).toBe(200);
      expect(body).toHaveProperty('token');
      expect(body).toHaveProperty('payload');
      expect(body.payload).toHaveProperty('_id');
      expect(body.payload).toHaveProperty('email');
      expect(body.payload).toHaveProperty('firstName');
      expect(body.payload).toHaveProperty('lastName');
      expect(body.payload).toHaveProperty('account');
    });

    it('should fail to login user and return 400', async () => {
      const { body, status } = await request(app).post('/auth/login').send({
        email: registerDto.email,
        password: 'qwerty',
      });
      expect(status).toBe(400);
      expect(body.message).toBe('Wrong password');
    });
  });
});
