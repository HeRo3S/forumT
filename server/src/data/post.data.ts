import { PostType } from '@prisma/client';
import prisma from '../addons/prismaClient.js';

interface ICreateProps {
  username: string;
  groupname: string;
  type: string;
  content: string;
  title: string;
}
async function create(props: ICreateProps) {
  const { username, groupname, type, content, title } = props;
  const post = await prisma.post.create({
    data: {
      username,
      groupname,
      title,
      type: PostType[type as keyof typeof PostType],
      content,
    },
  });
  return post;
}

async function readOnly(postID: number) {
  const post = await prisma.post.findUnique({
    where: {
      id: postID,
    },
  });
  return post;
}

interface IReadManyProps {
  groupname: string;
}
async function readMany(props: IReadManyProps) {
  const posts = await prisma.post.findMany({
    where: props,
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      groupname: true,
    },
  });
  return posts;
}

async function update() {}
async function remove(id: number) {
  const transaction = await prisma.$transaction([
    prisma.postReport.deleteMany({
      where: {
        postID: id,
      },
    }),
    prisma.postReaction.deleteMany({
      where: {
        postID: id,
      },
    }),
    prisma.comment.deleteMany({
      where: {
        parentPostID: id,
      },
    }),
    prisma.attachment.deleteMany({
      where: {
        postID: id,
      },
    }),
    prisma.post.delete({
      where: {
        id,
      },
    }),
  ]);
  return transaction;
}

const PostData = { create, readOnly, readMany, update, remove };

export default PostData;
