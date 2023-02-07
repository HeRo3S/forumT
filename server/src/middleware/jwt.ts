import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// eslint-disable-next-line import/prefer-default-export
export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) res.status(401).json('Token not found');
  jwt.verify(
    <string>token,
    <string>process.env.ACCESS_TOKEN,
    (err, decoded) => {
      if (err) return res.status(403).json(err);
      if (decoded) {
        req.user = <typeof req.user>decoded;
      }
      next();
      return null;
    }
  );
}
