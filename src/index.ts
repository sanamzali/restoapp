import mongoose from 'mongoose';
import { app } from './app';
import { getEnv } from './utils/env';

const main = async () => {
  await mongoose.connect(getEnv('DB_URL'));
  app.listen(getEnv('APP_PORT'), () => {
    console.log(`Server running on port ${getEnv('APP_PORT')}`);
  });
};

void main();
