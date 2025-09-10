import * as mongoose  from 'mongoose';
import * as process from 'node:process';
import createApp from './app';
import * as http from 'node:http';
import config from './config';
import { logger } from 'nx/src/utils/logger';
import { attachSocket } from './sockets/socket';

async function start(){
  const app = createApp();
  const server = http.createServer(app);

  /*Attach socket.io*/
  const io = attachSocket(server);
  //Storing the io instance in app for later use in controllers
  app.set('io', io);

  /*Connect Mongodb*/
  try{
    await mongoose.connect(config.mongoUrl);
    logger.info('Connected to MongoDB');
  }catch (err){
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  }

  server.listen(config.port, () => {
    logger.info(`Frontend app served at http://localhost:${config.port}`);
    logger.info(`Backend at http://localhost:${config.port}/api`);
  });
  server.on('error', logger.error);
}

start().catch(err => {
  logger.error('Error starting server');
  process.exit(1);
});
