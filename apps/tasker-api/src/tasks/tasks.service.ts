import { Request, Response } from 'express';
import { logger } from 'nx/src/utils/logger';
import { TaskModel } from './task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { socketBus } from '../sockets/events/socket.bus';


export async function getAllTasks(req:any,res:Response){
  const userId = req.user.id;
  const tasks = await TaskModel.find({ user: userId })
    .sort({ createdAt: -1 });
  res.json(tasks);
}

export async function createTask(req:any,res:Response){
  const {title,description,status} = req.body as CreateTaskDto;
  const userId = req.user.id;
  if(!title || !userId){
    return res.status(400).json({message:"Title and User are required"});
  }
  try{
    const newTask = new TaskModel({title,description,status,user:userId})
    await newTask.save();
    const task = newTask.toJSON();
    /*Emit to socket emitter*/
    socketBus.emit("task:created", {
      userId,
      task,
      initiatorId: req.headers["x-socket-id"],
    });
    res.status(201).json(task);
  }catch (error){
    if (error.code === 11000) {
      res.status(400).json({message:"Duplicate task title"});
    }else{
      res.status(400).json({message:"Error creating task"});
    }
  }
}

export async function updateTask(req:any,res:Response){
  const userId = req.user.id;
  const { id } = req.params;
  const changes = req.body;

  try {
    const task = await TaskModel.findByIdAndUpdate(
      {_id:id,user:userId},
      { $set: {...changes} },
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const updatedTask = task.toJSON();
    /*Emit to socket emitter*/
    socketBus.emit("task:updated", {
      userId,
      task: updatedTask,
      initiatorId: req.headers["x-socket-id"],
    });
    res.json(updatedTask);;
  }catch (error){
    if (error.code === 11000) {
      res.status(400).json({message:"Duplicate task title"});
    }else{
      res.status(400).json({message:"Error updating task"});
    }
  }


}

export async function deleteTask(req:any,res:Response){
  const userId = req.user.id;
  const { id } = req.params;
  const task =
    await TaskModel.findByIdAndDelete({_id:id,user:userId});

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  /*Emit to socket emitter*/
  socketBus.emit("task:deleted", {
    userId,
    taskId: id,
    initiatorId: req.headers["x-socket-id"],
  });

  res.json({ message: "Task deleted" });
}
