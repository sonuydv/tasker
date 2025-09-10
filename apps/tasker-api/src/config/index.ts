

export default {
  port: process.env.PORT || 3000,
  mongoUrl: process.env.MONGO_URL || 'mongodb://root:passwd@localhost:27017/tasker?authSource=admin',
  jwtSecret: process.env.JWT_SECRET || 'dev_secret',
  jwtExpiresIn: '7d',
};
