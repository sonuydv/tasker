import { Request, Response } from 'express';
import { logger } from 'nx/src/utils/logger';
import { TaskModel } from './task.schema';


export async function getAllTasks(req:any,res:Response){
  const userId = req.user.id;
  const tasks = await TaskModel.find({ user: userId }).sort({ createdAt: -1 });
  res.json(tasks);
}

export async function createTask(req:Request,res:Response){
  const {title,description,status,user} = req.body;
  if(!title || !user){
    return res.status(400).json({message:"Title and User are required"});
  }
  const newTask = new TaskModel({title,description,status,user});
  await newTask.save();
  res.status(201).json(newTask);
}

export async function updateTask(req:Request,res:Response){
  const {id} = req.params;
  const {title,description,status} = req.body;
  const task = await TaskModel.findById(id);
  if(!task){
    return res.status(404).json({message:"Task not found"});
  }
  task.title = title || task.title;
  task.description = description || task.description;
  task.status = status || task.status;
  await task.save();
  res.json(task);
}

export async function deleteTask(req:Request,res:Response){
  const {id} = req.params;
  const task = await TaskModel.findById(id);
  if(!task){
    return res.status(404).json({message:"Task not found"});
  }
  await task.deleteOne({_id:id});
  res.json({message:"Task deleted"});
}
