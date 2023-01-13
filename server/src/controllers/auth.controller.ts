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
    // TODO return error if username has been created
    const hashedPassword = await hashingPassword(req?.body?.password);
    // create new user using prisma
    const user = await prisma.user.create({
      data: {
        username: req?.body?.username,
        email: req?.body?.email,
        password: hashedPassword,
      },
    });
    // remove password when return data
    const { password, ...responseData } = user;
    console.log('New account created: ' + responseData);
    return res.status(200).json(responseData);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const PostLoginController = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
};
export { PostRegisterController, PostLoginController };
