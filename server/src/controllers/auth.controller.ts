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
      res.status(400).json('This account is not existed!');
      return;
    }
    // return error when password is not corrected
    if (!verifyPassword(req?.body?.password, existedUser.password)) {
      res.status(403).json('Wrong password!');
      return;
    }
    // create token
    const { accessToken, refreshToken } = generateToken(existedUser?.username);
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
    const userInfo: Partial<typeof existedUser> = existedUser;
    delete userInfo.password;
    delete userInfo.refreshToken;
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: config.refreshExpire,
    });
    res.status(200).json({ userInfo, accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function PostRegisterController(req: Request, res: Response) {
  try {
    // create new user using prisma
    const hashedPassword: string = await hashingPassword(req?.body?.password);
    const { accessToken, refreshToken } = generateToken(req?.body?.username);
    const user: User = await prisma.user.create({
      data: {
        username: req?.body?.username,
        email: req?.body?.email,
        password: hashedPassword,
        refreshToken,
      },
    });
    // remove password and token when return data
    const userInfo: Partial<typeof user> = user;
    delete userInfo.password;
    delete userInfo.refreshToken;
    // return successful response
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: config.refreshExpire,
    });
    return res.status(200).json({ userInfo, accessToken });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        // return error if username has been created
        case 'P2002':
          res.status(409).json('This account has existed!');
          break;
        default:
          res.status(500).json(err.message);
      }
    }
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

function generateToken(username: string): {
  accessToken: string;
  refreshToken: string;
} {
  const accessToken = jwt.sign(
    { username },
    process.env.ACCESS_TOKEN as string,
    {
      expiresIn: process.env.ACCESS_EXPIRE,
    }
  );
  const refreshToken = jwt.sign(
    { username },
    process.env.REFRESH_TOKEN as string,
    {
      expiresIn: process.env.REFRESH_EXPIRE,
    }
  );
  return { accessToken, refreshToken };
}

export { PostRegisterController, PostLoginController };
