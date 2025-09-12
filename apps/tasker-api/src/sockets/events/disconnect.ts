import { Server, Socket } from 'socket.io';
import { logger } from 'nx/src/utils/logger';

export const handleDisconnecting = (io: Server, socket: Socket) => {
  socket.on('disconnecting', () => {
    logger.info('Disconnected');
    socket.rooms.forEach((roomId) => {
      if (roomId !== socket.id) {
        const room = io.sockets.adapter.rooms.get(roomId);
        const activeSessions = room ? room.size - 1 : 0;
        io.to(roomId).emit('active-sessions', { count: activeSessions });
        logger.info(`Active sessions for ${roomId} after disconnect: ${activeSessions}`);
      }
    });
  });
};
