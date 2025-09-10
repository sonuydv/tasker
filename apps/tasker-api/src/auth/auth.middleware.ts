import { NextFunction } from 'express';
import config from '../config';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string
  }
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'] || req['cookies']?.token;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, config.jwtSecret) as { id: string; email: string };
      req.user = { id: decoded.id, email: decoded.email };
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
}


