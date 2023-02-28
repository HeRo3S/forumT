import { Request, Response, NextFunction } from 'express';
import allowedOrigins from '../config/allowedOrigins.js';

export default async function credentials(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const origins = req.headers.origin;
  if (origins && allowedOrigins.includes(origins)) {
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
}
