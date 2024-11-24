import request from 'supertest';
import { app } from '../../src/app';
import { User } from '../../src/types/users.types';
import { testDbCleanup, testDbConnect } from '../../src/test/utils';
import mongoose, { Document } from 'mongoose';
import { seedUsers } from '../../src/utils/db-seed';
import { CreateCompanyDto } from '../../src/types/companies.types';
import { login } from '../../src/services/users.service';

let db: typeof mongoose;
let token: string;
let user: User & Document;

describe('Companies test', () => {
  beforeAll(async () => {
    db = await testDbConnect();
    [user] = await seedUsers();
    const res = await login({
      email: 'johndoe@gmail.com',
      password: '1234',
    });
    token = res.token;
  });

  afterAll(async () => {
    await testDbCleanup(db);
  });

  const createCompanyDto: CreateCompanyDto = {
    email: 'company@gmail.com',
    name: 'Test company',
    address: 'There',
    phone: '12345678',
  };

  describe('POST /companies', () => {
    it('should create a company and return 200', async () => {
      const { body, status } = await request(app)
        .post('/companies')
        .set('Authorization', `Bearer ${token}`)
        .send(createCompanyDto);
      expect(status).toBe(200);
      expect(body.user).toBe(user._id?.toString());
      expect(body.account).toBe(user.account.toString());
    });
  });
});
