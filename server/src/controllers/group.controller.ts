import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../addons/prismaClient.js';

export async function CreateGroupController(req: Request, res: Response) {
  try {
    if (req.user === req.body.user.username) {
      const createdGroup = prisma.group.create({
        data: {
          groupname: req.body.groupname,
          displayname: req.body.displayname || '',
          userID: req.body.user.id,
        },
      });
      res.status(200).json(createdGroup);
    }
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        // return error if username has been created
        case 'P2002':
          res.status(409).json('This group has existed!');
          break;
        default:
          res.status(500).json(err.message);
      }
    }
  }
}
export async function GetAllGroupsExistedController(
  req: Request,
  res: Response
) {}
export async function GetGroupsUserFollowingController(
  req: Request,
  res: Response
) {
  // TODO here
}

export async function GetGroupPostsController(req: Request, res: Response) {}
export async function PostGroupPostController(req: Request, res: Response) {}
