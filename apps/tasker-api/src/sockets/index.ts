import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import { handleJoin } from './events/join';
import { handleDisconnecting } from './events/disconnect';
import { handleTaskEvents } from './events/task-events';
import { logger } from 'nx/src/utils/logger';

export function attachSocket(server:HttpServer) {
  const io = new Server(server);

  io.on('connection', (socket) => {
    logger.info('Connection : new user connected');
    handleJoin(io, socket);
    handleDisconnecting(io, socket);
    handleTaskEvents(io, socket);  // attach task event handlers
  });

  return io;
}
