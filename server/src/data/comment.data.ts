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
  });
  return comment;
}

interface IReadProps {}
async function read(props: IReadProps) {}

interface IReadManyProps {
  parentPostID: number;
}
async function readMany(props: IReadManyProps) {
  const comments = await prisma.comment.findMany({
    where: props,
  });
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

const CommentData = { create, read, readMany, update, remove, count };

export default CommentData;
