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
  groupname?: string[];
  username?: string;
  cursorID?: number;
  take: number;
}
const setUpReadManyConfig = (props: IReadManyProps) => {
  const { groupname, username, cursorID, take } = props;
  let config: object = {
    where: {
      username,
      groupname: {
        in: groupname,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      groupname: true,
    },
    take,
  };
  if (cursorID)
    config = {
      ...config,
      cursor: {
        id: cursorID,
      },
      skip: 1,
    };
  return config;
};
async function readMany(props: IReadManyProps) {
  const posts = await prisma.post.findMany(setUpReadManyConfig(props));
  return posts;
}

async function readMostPopular() {
  const posts = await prisma.post.findMany({
    where: {},
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
interface IReadContainKeywordsProps {
  keyword: string;
}
async function readContainKeyword(props: IReadContainKeywordsProps) {
  const { keyword } = props;
  const posts = await prisma.post.findMany({
    where: {
      title: {
        contains: keyword,
      },
    },
    select: {
      id: true,
      title: true,
      username: true,
      groupname: true,
    },
    take: 5,
  });
  return posts;
}

interface IUpdate {
  id: number;
  title?: string;
  content?: string;
  deletedAt?: Date | null;
}
async function update(props: IUpdate) {
  const { id, title, content, deletedAt } = props;
  const updatedAt = new Date(Date.now());
  const post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      content,
      deletedAt,
      updatedAt,
    },
  });
  return post;
}

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

const PostData = {
  create,
  readOnly,
  readMany,
  readMostPopular,
  readContainKeyword,
  update,
  remove,
};

export default PostData;
