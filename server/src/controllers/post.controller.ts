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

export async function GetUserPostReactController(req: Request, res: Response) {
  if (!req.user?.username) return res.status(400).json('cant find username');
  const userReact = await prisma.postReaction.findUnique({
    where: {
      username: req.user.username,
    },
  });
  return res.status(200).json(userReact);
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
