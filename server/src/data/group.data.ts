import { GroupStatus } from '@prisma/client';
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

interface IReadManyWithPagination {
  limit: number;
  page?: number;
  status?: string[];
}
const setUpReadManyWithPaginationConfig = (props: IReadManyWithPagination) => {
  const { limit, page } = props;
  const status = props.status?.map(
    (s) => GroupStatus[s as keyof typeof GroupStatus]
  );
  let config: object = {
    where: {
      status: {
        in: status,
      },
    },
    take: limit,
  };
  if (page) {
    config = { ...config, skip: limit * page };
  }
  return config;
};
async function readManyWithPagination(props: IReadManyWithPagination) {
  const groups = await prisma.group.findMany(
    setUpReadManyWithPaginationConfig(props)
  );
  return groups;
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

async function count() {
  const res = await prisma.group.count();
  return res;
}
interface IUpdateProps {
  groupname: string;
  displayname?: string;
  description?: string;
  avatarURL?: string;
}
async function update(props: IUpdateProps) {
  const { groupname, displayname, description, avatarURL } = props;
  const updatedGroup = await prisma.group.update({
    where: {
      groupname,
    },
    data: {
      displayname,
      description,
      avatarURL,
    },
  });
  return updatedGroup;
}
async function remove() {}

const GroupData = {
  create,
  read,
  readManyWithPagination,
  readContainKeyword,
  count,
  update,
  remove,
};

export default GroupData;
