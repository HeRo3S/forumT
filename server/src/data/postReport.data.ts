import prisma from '../addons/prismaClient.js';

interface ICreateProps {
  postID: number;
  username: string;
  bannedReason: string;
}
async function create(props: ICreateProps) {
  const { postID, username, bannedReason } = props;
  const report = await prisma.postReport.create({
    data: {
      postID,
      username,
      bannedReason,
    },
  });
  return report;
}

interface IReadProps {}
async function read(props: IReadProps) {}

interface IReadManyProps {
  postID: number;
}
async function readMany(props: IReadManyProps) {
  const reports = await prisma.postReport.findMany({
    where: props,
  });
  return reports;
}

interface IGroupByPostIDProps {
  postID: number;
}
async function groupByPostID(props: IGroupByPostIDProps) {
  const reports = await prisma.postReport.groupBy({
    by: ['bannedReason'],
    where: props,
    orderBy: {
      bannedReason: 'desc',
    },
    _count: true,
  });
  return reports;
}

async function update() {}
async function remove() {}

const PostReportData = {
  create,
  read,
  readMany,
  groupByPostID,
  update,
  remove,
};

export default PostReportData;
