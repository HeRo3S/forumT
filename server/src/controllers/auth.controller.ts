import { Prisma, User } from '@prisma/client';
import crypto from 'crypto';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import prisma from '../addons/prismaClient.js';

const config = {
  saltLength: 16,
  keyLength: 64,
  accessExpire: ms(process.env.ACCESS_EXPIRE as string),
  refreshExpire: ms(process.env.REFRESH_EXPIRE as string),
};

async function PostLoginController(req: Request, res: Response) {
  try {
    let existedUser = await prisma.user.findUnique({
      where: {
        username: req?.body?.username,
        email: req?.body?.email,
      },
    });
    // return error when account is not existed
    if (!existedUser) {
      return res.status(400).json('This account is not existed!');
    }
    // return error when password is not corrected
    if (!verifyPassword(req?.body?.password, existedUser.password)) {
      return res.status(403).json('Wrong password!');
    }
    // create token
    const { accessToken, refreshToken } = generateToken(existedUser);
    // update refreshToken to DB
    existedUser = await prisma.user.update({
      where: {
        username: existedUser.username,
      },
      data: {
        refreshToken,
      },
    });
    // return successful response
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: config.refreshExpire,
    });
    return res.status(200).json({ accessToken });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json(err);
      throw err;
    }
  }
}

async function PostRegisterController(req: Request, res: Response) {
  try {
    // create new user using prisma
    const hashedPassword: string = await hashingPassword(req?.body?.password);
    const user: User = await prisma.user.create({
      data: {
        username: req?.body?.username,
        email: req?.body?.email,
        password: hashedPassword,
        refreshToken: '',
      },
    });
    const { accessToken, refreshToken } = generateToken(user);
    await prisma.user.update({
      where: {
        username: user.username,
      },
      data: {
        refreshToken,
      },
    });
    // return successful response
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: config.refreshExpire,
    });
    return res.status(200).json({ accessToken });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        // return error if username has been created
        case 'P2002':
          res.status(409).json('This account has existed!');
          break;
        default:
          res.status(500).json(err.message);
          throw err;
      }
    } else {
      res.status(500).json(err);
      throw err;
    }
  }
}

async function HandleRefreshToken(req: Request, res: Response) {
  try {
    const { cookies } = req;
    if (!cookies?.jwt) return res.status(401).json("can't find refresh token");
    const user = await prisma.user.findFirst({
      where: {
        refreshToken: cookies.jwt,
      },
    });
    if (!user)
      return res.status(403).json("can't find user with this refresh token");
    jwt.verify(
      cookies.jwt as string,
      process.env.REFRESH_TOKEN as string,
      (err, decoded) => {
        if (err || (decoded as Partial<User>).username !== user.username)
          return res.status(400).json("can't decode refresh token");
        const { accessToken } = generateToken(user);
        return res.status(200).json({ accessToken });
      }
    );
    return null;
  } catch (err) {
    res.status(500).json(err);
    throw err;
  }
}

export async function HandleLogout(req: Request, res: Response) {
  try {
    const { cookies } = req;
    if (!cookies?.jwt) return res.status(403).json("can't find refresh token");
    const user = await prisma.user.findFirst({
      where: {
        refreshToken: cookies.jwt,
      },
    });
    if (!user) {
      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      return res.sendStatus(204);
    }
    // *remove token
    await prisma.user.update({
      where: {
        username: user.username,
      },
      data: {
        refreshToken: '',
      },
    });
    // *remove cookies, set `secure: true` for https request
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return res.sendStatus(204);
  } catch (err) {
    res.status(500).json(err);
    throw err;
  }
}

async function hashingPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // created randomize salt to hash
    const salt = crypto.randomBytes(config.saltLength).toString('hex');
    // hash function
    // https://nodejs.org/api/crypto.html#crypto_crypto_scrypt_password_salt_keylen_options_callback
    crypto.scrypt(password, salt, config.keyLength, (err, derivedKey) => {
      if (err) reject(err);
      // need salt before the hashed password to verify afterward
      resolve(`${salt}:${derivedKey.toString('hex')}`);
    });
  });
}

async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const [salt, key] = hashedPassword.split(':');
    crypto.scrypt(password, salt, config.keyLength, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key === derivedKey.toString('hex'));
    });
  });
}

export function generateToken(user: User): {
  accessToken: string;
  refreshToken: string;
} {
  const userInfo: Partial<User> = { ...user };
  delete userInfo.password;
  delete userInfo.refreshToken;
  const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN as string, {
    expiresIn: process.env.ACCESS_EXPIRE,
  });
  const refreshToken = jwt.sign(userInfo, process.env.REFRESH_TOKEN as string, {
    expiresIn: process.env.REFRESH_EXPIRE,
  });
  return { accessToken, refreshToken };
}

export { PostRegisterController, PostLoginController, HandleRefreshToken };
