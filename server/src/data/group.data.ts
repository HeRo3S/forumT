import prisma from '../addons/prismaClient.js';

interface ICreateProps {
  groupname: string;
  displayname: string;
  ownername: string;
}
async function create(props: ICreateProps) {
  const { groupname, displayname, ownername } = props;
  const group = await prisma.group.create({
    data: {
      groupname,
      displayname,
      ownername,
    },
  });
  return group;
}

interface IReadProps {
  groupname: string;
}
async function read(props: IReadProps) {
  const group = await prisma.group.findUnique({
    where: props,
  });
  return group;
}

interface IReadContainKeywordsProps {
  keyword: string;
}
async function readContainKeyword(props: IReadContainKeywordsProps) {
  const { keyword } = props;
  const matchingGroups = await prisma.group.findMany({
    where: {
      groupname: {
        contains: keyword,
      },
    },
    select: {
      id: true,
      groupname: true,
      displayname: true,
      avatarURL: true,
    },
    take: 5,
  });
  return matchingGroups;
}

async function update() {}
async function remove() {}

const GroupData = { create, read, readContainKeyword, update, remove };

export default GroupData;