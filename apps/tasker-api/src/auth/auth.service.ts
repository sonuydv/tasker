import { Request, Response } from 'express';


export async function register(req:Request,res:Response){
  res.send('register');
}

export async function login(req:Request,res:Response){
  res.send('login');
}

