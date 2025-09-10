import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import authController from './auth/auth.controller';
import tasksController from './tasks/tasks.controller';


export default function createApp(){
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  app.use(cors({origin: 'http://localhost:4200', credentials: true}));


  //Routes
  app.use('/api/asdf',authController);
  app.use('/api/tasks',tasksController);

  // Serve Angular build
  app.use(express.static(path.join(__dirname, 'frontend')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/index.html'));
  });

  return app;
}


