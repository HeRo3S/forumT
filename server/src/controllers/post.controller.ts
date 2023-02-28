import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../addons/prismaClient.js';

export async function CreateGroupPostController(req: Request, res: Response) {
  try {
    const groupname = req.params?.groupname;
    if (!groupname) return res.status(400).json('cannot find group');
    const { title, content, type } = req.body;
    const username = <string>req.user?.username;
    const post = await prisma.post.create({
      data: {
        username,
        groupname,
        title,
        type,
        content,
      },
    });
    return res.status(200).json(post);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        default:
          res.status(500).json({ code: err.code, message: err.message });
          throw err;
      }
    } else {
      res.status(500).json(err);
      throw err;
    }
  }
}

export async function CreatePostAttachmentController(
  req: Request,
  res: Response
) {}
export async function GetPostController(req: Request, res: Response) {
  try {
    const postID = req.params?.postID;
    const post = await prisma.post.findUnique({
      where: {
        id: +postID,
      },
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
}
export async function GetPostCommentsController(req: Request, res: Response) {}
export async function ReactPostController(req: Request, res: Response) {}
export async function PostCommentController(req: Request, res: Response) {}
