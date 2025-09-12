import { Server, Socket } from 'socket.io';
import { logger } from 'nx/src/utils/logger';
import { socketBus } from './socket.bus';

let isListening:boolean = false;

export const handleTaskEvents = (io: Server, socket: Socket) => {

    if(!isListening){

      socketBus.on("task:created", ({ userId, task, initiatorId }) => {
        logger.info(`Task added by ${initiatorId}: ${task.id}`);
        if (initiatorId) {
          io.to(userId).except(initiatorId).emit("task:created", task);
        } else {
          io.to(userId).emit("task:created", task);
        }
      });

      socketBus.on("task:updated", ({ userId, task ,initiatorId}) => {
        logger.info(`Task updated by ${initiatorId}: ${task.id}`);
        if(initiatorId){
          io.to(userId).except(initiatorId).emit("task:updated", task);
        }else {
          io.to(userId).emit("task:updated", task);
        }
      });

      socketBus.on("task:deleted", ({ userId, taskId,initiatorId }) => {
        logger.info(`Task deleted by ${initiatorId}: ${taskId}`);
        if(initiatorId){
          io.to(userId).except(initiatorId).emit("task:deleted", { taskId });
        }else {
          io.to(userId).emit("task:deleted", { taskId });
        }
      });

      isListening = true;
    }

};
