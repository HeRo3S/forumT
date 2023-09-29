import { ReactionType } from '@prisma/client';
import prisma from '../addons/prismaClient.js';

interface ICreateProps {
  username: string;
  reaction: string;
  postID: number;
}
async function create(props: ICreateProps) {
  const { username, reaction, postID } = props;
  const newReaction = await prisma.postReaction.create({
    data: {
      username,
      reaction: ReactionType[reaction as keyof typeof ReactionType],
      postID,
    },
  });
  return newReaction;
}

interface IReadProps {
  postID: number;
  username?: string;
}
async function read(props: IReadProps) {
  const reaction = await prisma.postReaction.findFirst({
    where: props,
  });
  return reaction;
}

async function groupByPostID(postID: number) {
  const reactions = await prisma.postReaction.groupBy({
    by: ['reaction'],
    where: {
      postID,
    },
    orderBy: {
      reaction: 'asc',
    },
    _count: true,
  });
  return reactions;
}

interface IUpdateProps {
  reactionID: number;
  reaction: string;
}
async function update(props: IUpdateProps) {
  const { reactionID, reaction } = props;
  const updatedReaction = await prisma.postReaction.update({
    where: {
      id: reactionID,
    },
    data: {
      reaction: ReactionType[reaction as keyof typeof ReactionType],
    },
  });
  return updatedReaction;
}
interface IUpsertProps {
  username: string;
  reaction: string;
  postID: number;
  reactionID?: number;
}
async function upsert(props: IUpsertProps) {
  const { username, reaction, postID } = props;
  const reactionID = props.reactionID || -1;
  const newReaction = await prisma.postReaction.upsert({
    create: {
      username,
      reaction: ReactionType[reaction as keyof typeof ReactionType],
      postID,
    },
    update: {
      reaction: ReactionType[reaction as keyof typeof ReactionType],
    },
    where: {
      id: reactionID,
    },
  });
  return newReaction;
}
async function remove() {}

const PostReactionData = {
  create,
  read,
  groupByPostID,
  update,
  upsert,
  remove,
};

export default PostReactionData;
