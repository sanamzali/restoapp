import { register } from '../services/users.service';

export const seedUsers = async () => {
  const john = await register({
    email: 'johndoe@gmail.com',
    password: '1234',
    firstName: 'John',
    lastName: 'Doe',
  });
  return [john];
};
