import { Request, Response } from 'express';

export function notFound(req: Request, res: Response,next: any) {
  res.status(404).json({ success: false, message: 'API route not found' });;
}
