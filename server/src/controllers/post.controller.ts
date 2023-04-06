import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../addons/prismaClient.js';

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
    const nUpvote = await prisma.postReaction.count({
      where: {
        postID: +postID,
        reaction: 'UPVOTE',
      },
    });
    const nDownvote = await prisma.postReaction.count({
      where: {
        postID: +postID,
        reaction: 'DOWNVOTE',
      },
    });
    const nComments = await prisma.comment.count({
      where: {
        parentPostID: +postID,
      },
    });
    const attachments = await prisma.attachment.findMany({
      where: {
        postID: +postID,
      },
    });
    res
      .status(200)
      .json({ post, reaction: { nUpvote, nDownvote, nComments }, attachments });
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function PostReactController(req: Request, res: Response) {
  try {
    if (!req.user?.username)
      return res.status(400).json('did not find username');
    const existedReaction = await prisma.postReaction.findUnique({
      where: {
        username: req.user.username,
      },
    });
    if (!existedReaction) {
      const newReaction = await prisma.postReaction.create({
        data: {
          username: req.user.username,
          reaction: req.body.reaction,
          postID: +req.params.postID,
        },
      });
      return res.status(200).json(newReaction);
    }
    const updatedReaction = await prisma.postReaction.update({
      where: {
        id: existedReaction.id,
      },
      data: {
        reaction: req.body.reaction,
      },
    });
    return res.status(200).json(updatedReaction);
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
