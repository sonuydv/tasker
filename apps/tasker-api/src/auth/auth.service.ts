import { Request, Response } from 'express';
import { RegisterUserDto } from './dto/register-user.dto';
import { createUser, getUserByEmail } from '../users';
import { LoginUserDto } from './dto/login-user.dto';
import jwt from 'jsonwebtoken';
import { comparePassword } from '../users/user.util';
import config from '../config';


export async function register(req:Request,res:Response){
  const registerUser = req.body as RegisterUserDto;
  const existing
    = await getUserByEmail(registerUser.email);
  if (existing){
    return res.status(409).json({ message: 'Email already exists' });
  }
  const u = await createUser(registerUser);


  const token = jwt.sign(
    { id: u._id, email: u.email },
    config.jwtSecret, { expiresIn: config.jwtExpiresIn }
  );

  // Send token as HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true,
    path:'/api',
    sameSite: 'none',
    maxAge: 60 * 60 * 1000 // 1 hour
  });

  res.status(201).json({ id: u._id,firstName:u.firstName,lastName:u.lastName, email: u.email,token });

}

export async function login(req:Request,res:Response){
  const loginUser = req.body as LoginUserDto;
  const user
    = await getUserByEmail(loginUser.email);
  if (!user) return res.status(401).json({ message: 'User email not found!' });
  const match = await comparePassword(loginUser.password, user.password);
  if (!match) return res.status(401).json({ message: 'Password does not match!' });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    config.jwtSecret, { expiresIn: config.jwtExpiresIn }
  );

  // Send token as HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: config.nodeEnv !== 'development' ? 'none' : 'lax',
    maxAge: 60 * 60 * 1000
  });


  res.json({id: user._id,firstName:user.firstName,lastName:user.lastName, email: user.email,token });
}

