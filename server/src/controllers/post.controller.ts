import { Request, Response } from 'express';
import prisma from '../addons/prismaClient.js';

export async function GetGroupPostsController(req: Request, res: Response) {
  try {
    const groupname = req.params.groupname as string;
    const groupPosts = await prisma.post.findMany({
      where: {
        groupname,
      },
    });
    res.status(200).json(groupPosts);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function CreateGroupPostController(req: Request, res: Response) {}
export async function GetPostCommentsController(req: Request, res: Response) {}
export async function ReactPostController(req: Request, res: Response) {}
export async function PostCommentController(req: Request, res: Response) {}
