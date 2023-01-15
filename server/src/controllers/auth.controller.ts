import { User } from '@prisma/client';
import crypto from 'crypto';
import { Request, Response } from 'express';
import prisma from '../client.js';

const config = {
  saltLength: 16,
  keyLength: 64,
};

async function hashingPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    //created randomize salt to hash
    const salt = crypto.randomBytes(config.saltLength).toString('hex');
    // hash function
    // https://nodejs.org/api/crypto.html#crypto_crypto_scrypt_password_salt_keylen_options_callback
    crypto.scrypt(password, salt, config.keyLength, (err, derivedKey) => {
      if (err) reject(err);
      //need salt before the hashed password to verify afterward
      resolve(salt + ':' + derivedKey.toString('hex'));
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

const PostRegisterController = async (req: Request, res: Response) => {
  try {
    // return error if username has been created
    const existedUser = await prisma.user.findUnique({
      where: {
        username: req?.body?.username,
      },
    });
    existedUser && res.status(409).json('This account has been existed!');
    // create new user using prisma
    const hashedPassword: string = await hashingPassword(req?.body?.password);
    const user: User = await prisma.user.create({
      data: {
        username: req?.body?.username,
        email: req?.body?.email,
        password: hashedPassword,
      },
    });
    // remove password when return data
    const { password, ...responseData } = user;
    // return successful response
    return res.status(200).json(responseData);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const PostLoginController = async (req: Request, res: Response) => {
  try {
    // find user with request username or email
    const existedUser = await prisma.user.findUnique({
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
    // return successful response
    const { password, ...responseData } = existedUser;
    return res.status(200).json(responseData);
  } catch (err) {
    res.status(500).json(err);
  }
};
export { PostRegisterController, PostLoginController };
