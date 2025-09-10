import { Server as HttpServer } from 'http';
import { Server,Socket } from 'socket.io';
import { logger } from 'nx/src/utils/logger';

export function attachSocket(server:HttpServer){
  const io = new Server(server,{
    cors: {
      origin: 'http://localhost:4200',
      methods: ['GET', 'POST'],
      credentials: true
    }
  }
  );

  io.on('connection', (socket: Socket) => {
    logger.info(`socket connected: ${socket.id}`);

    socket.on('join', (userId: string) => {
      socket.join(userId);
      logger.info(`socket ${socket.id} joined room ${userId}`);
    });

    socket.on('disconnect', (reason) => {
      logger.info(`socket disconnected: ${socket.id} reason: ${reason}`);
    });
  });

  return io;

}
