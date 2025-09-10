import { Request, Response } from 'express';
import { logger } from 'nx/src/utils/logger';


export async function getAllTasks(req:Request,res:Response){
  logger.info("request")
  res.json([{id:1,title:'Task 1'},{id:2,title:'Task 2'}]);
}
