import * as process from 'node:process';


export default {
  nodeEnv:process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  mongoUrl: process.env.MONGO_URL || 'mongodb://root:passwd@localhost:27017/tasker?authSource=admin',
  jwtSecret: process.env.JWT_SECRET || 'dev_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
};
