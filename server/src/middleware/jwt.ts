import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface ExtendRequest extends Request {
  [key: string]: unknown;
}

export function authenticateToken(
  req: ExtendRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json('Token not found');
  jwt.verify(token, process.env.TOKEN_SECRET as string, (err, decoded) => {
    if (err) return res.status(403).json(err);
    if (decoded) {
      req.user = (<JwtPayload>decoded).username;
    }
    next();
  });
}
