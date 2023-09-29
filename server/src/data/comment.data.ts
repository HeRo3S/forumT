import prisma from '../addons/prismaClient.js';

interface ICreateProps {
  parentPostID: number;
  parentGroupname: string;
  username: string;
  content: string;
}
async function create(props: ICreateProps) {
  const { parentGroupname, parentPostID, username, content } = props;
  const comment = await prisma.comment.create({
    data: {
      parentPostID,
      parentGroupname,
      username,
      content,
    },
    include: {
      user: {
        select: {
          avatarURL: true,
          username: true,
          displayname: true,
        },
      },
    },
  });
  return comment;
}

interface IReadProps {}
async function read(props: IReadProps) {}

interface IReadManyWithPostIDProps {
  parentPostID: number;
}
async function readManyWithPostID(props: IReadManyWithPostIDProps) {
  const comments = await prisma.comment.findMany({
    where: props,
    include: {
      user: {
        select: {
          avatarURL: true,
          username: true,
          displayname: true,
        },
      },
    },
  });
  return comments;
}

interface IReadManyWithUsernameProps {
  username: string;
  cursorID?: number;
  take: number;
}
const setUpReadManyWithUsernameConfig = (props: IReadManyWithUsernameProps) => {
  const { username, cursorID, take } = props;
  let config: object = {
    where: {
      username,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take,
    include: {
      parentPost: {
        select: {
          title: true,
          groupname: true,
          username: true,
        },
      },
    },
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
async function readManyWithUsername(props: IReadManyWithUsernameProps) {
  const comments = await prisma.comment.findMany(
    setUpReadManyWithUsernameConfig(props)
  );
  return comments;
}

async function update() {}
async function remove() {}
interface ICountProps {
  parentPostID: number;
}
async function count(props: ICountProps) {
  const result = await prisma.comment.count({
    where: props,
  });
  return result;
}

const CommentData = {
  create,
  read,
  readManyWithPostID,
  readManyWithUsername,
  update,
  remove,
  count,
};

export default CommentData;
