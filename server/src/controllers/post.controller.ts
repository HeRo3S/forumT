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
