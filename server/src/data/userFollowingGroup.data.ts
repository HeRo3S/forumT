import { UserInGroupType } from '@prisma/client';
import ms from 'ms';
import prisma from '../addons/prismaClient.js';

interface ICreateProps {
  username: string;
  groupname: string;
  role?: string;
}
async function create(props: ICreateProps) {
  const { username, groupname, role } = props;
  const userFollowGroup = await prisma.userFollowGroup.create({
    data: {
      username,
      groupname,
      role: UserInGroupType[role as keyof typeof UserInGroupType],
    },
  });
  return userFollowGroup;
}

interface IReadProps {
  username: string;
  groupname: string;
}
async function read(props: IReadProps) {
  const followingGroupRecord = await prisma.userFollowGroup.findUnique({
    where: {
      username_groupname: props,
    },
  });
  return followingGroupRecord;
}

interface IReadManyProps {
  groupname?: string;
  username?: string;
  role?: string;
  limit: number;
  page?: number;
}
function setUpReadManyConfig(props: IReadManyProps) {
  const { groupname, username, role, limit, page } = props;
  let config: object = {
    where: {
      groupname,
      username,
      role: UserInGroupType[role as keyof typeof UserInGroupType],
    },
    select: {
      username: true,
      groupname: true,
      role: true,
      timeUnbanned: true,
      group: true,
    },
    take: limit,
  };
  if (page)
    config = {
      ...config,
      skip: limit * page,
    };
  return config;
}
async function readMany(props: IReadManyProps) {
  const userFollowGroupList = await prisma.userFollowGroup.findMany(
    setUpReadManyConfig(props)
  );
  return userFollowGroupList;
}

interface IUpdateProps {
  role?: string;
  banTime?: string;
  username: string;
  groupname: string;
}
async function update(props: IUpdateProps) {
  const { username, groupname, role, banTime } = props;
  const now = new Date();
  const timeUnbanned = banTime
    ? new Date(now.getTime() + ms(banTime))
    : undefined;
  const awaited = await prisma.userFollowGroup.upsert({
    where: {
      username_groupname: {
        username,
        groupname,
      },
    },
    update: {
      role: UserInGroupType[role as keyof typeof UserInGroupType],
      timeUnbanned,
    },
    create: {
      username,
      groupname,
      role: UserInGroupType[role as keyof typeof UserInGroupType],
      timeUnbanned,
    },
  });
  return awaited;
}

interface IRemoveProps {
  username: string;
  groupname: string;
}
async function remove(props: IRemoveProps) {
  const followingGroupRecord = await prisma.userFollowGroup.delete({
    where: {
      username_groupname: props,
    },
  });
  return followingGroupRecord;
}

interface ICountProps {
  groupname: string;
  role?: string;
}
async function count(props: ICountProps) {
  const { groupname, role } = props;
  const followers = await prisma.userFollowGroup.count({
    where: {
      groupname,
      role: UserInGroupType[role as keyof typeof UserInGroupType],
    },
  });
  return followers;
}

const UserFollowingGroupData = {
  create,
  read,
  readMany,
  update,
  remove,
  count,
};

export default UserFollowingGroupData;
