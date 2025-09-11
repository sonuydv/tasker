import { Request, Response } from 'express';
import { logger } from 'nx/src/utils/logger';
import { TaskModel } from './task.schema';
import { CreateTaskDto } from './dto/create-task.dto';


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
  const newTask = new TaskModel({title,description,status,user:userId})
  await newTask.save();
  res.status(201).json(newTask);
}

export async function updateTask(req:Request,res:Response){
  const { id } = req.params;
  const { title, description, status } = req.body;

  const task = await TaskModel.findByIdAndUpdate(
    id,
    { $set: { title, description, status } },
    { new: true, runValidators: true }
  );

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);;
}

export async function deleteTask(req:Request,res:Response){
  const { id } = req.params;
  const task = await TaskModel.findByIdAndDelete(id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json({ message: "Task deleted" });
}
