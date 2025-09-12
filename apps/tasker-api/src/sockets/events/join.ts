import { Server, Socket } from 'socket.io';
import { logger } from 'nx/src/utils/logger';

export const handleJoin = (io: Server, socket: Socket) => {
  socket.on('join', (userId: string) => {
    socket.join(userId);
    logger.info(`socket ${socket.id} joined room ${userId}`);

    // Send active session count
    const room = io.sockets.adapter.rooms.get(userId);
    const activeSessions = room ? room.size : 0;
    io.to(userId).emit('active-sessions', { count: activeSessions });
  });
};

