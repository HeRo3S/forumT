import { ReactionType } from '@prisma/client';
import prisma from '../addons/prismaClient.js';

async function UpdateComments(
  username: string,
  groupname: string,
  postID: string,
  comment: string
) {
  const updatedComment = await prisma.comment.create({
    data: {
      username,
      parentGroupname: groupname,
      parentPostID: +postID,
      content: comment,
    },
  });
  return updatedComment;
}

async function UpdatePostReactions(
  username: string,
  postID: number,
  reaction: string
) {
  const existedReaction = await prisma.postReaction.findFirst({
    where: {
      username,
      postID,
    },
  });
  if (!existedReaction) {
    await prisma.postReaction.create({
      data: {
        username,
        reaction: ReactionType[reaction as keyof typeof ReactionType],
        postID,
      },
    });
  } else {
    await prisma.postReaction.update({
      where: {
        id: existedReaction.id,
      },
      data: {
        reaction: ReactionType[reaction as keyof typeof ReactionType],
      },
    });
  }
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
  return { nUpvote, nDownvote };
}

const UpdateService = { UpdateComments, UpdatePostReactions };

export default UpdateService;
