import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

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
    process.env.TOKEN_SECRET as string,
    (err, decoded) => {
      if (err) return res.status(403).json(err);
      if (decoded) {
        req.user = (<JwtPayload>decoded).username;
      }
      next();
      return null;
    }
  );
}
