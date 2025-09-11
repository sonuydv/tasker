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
  const token = extractToken(req);
  if (token) {
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

function extractToken(req: Request): string | null {
  // Check Authorization header
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7); // remove "Bearer "
  }

  // Check cookies
  if (req.cookies?.token) {
    return req.cookies.token;
  }

  return null;
}
