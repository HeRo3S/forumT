import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../addons/prismaClient.js';

export async function GetPostCommentsController(req: Request, res: Response) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        parentPostID: +req.params.postID,
      },
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function PostCommentController(req: Request, res: Response) {
  if (!req.user?.username) return res.status(400).json('cannot find username');
  try {
    const comment = await prisma.comment.create({
      data: {
        parentPostID: +req.params.postID,
        username: req.user.username,
        content: req.body.content,
      },
    });
    res.status(200).json(comment);
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
