import { UserInGroupType } from '@prisma/client';
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
}
async function readMany(props: IReadManyProps) {
  const { groupname, username, role } = props;
  const userFollowGroupList = await prisma.userFollowGroup.findMany({
    where: {
      groupname,
      username,
      role: UserInGroupType[role as keyof typeof UserInGroupType],
    },
    select: {
      group: true,
    },
  });
  return userFollowGroupList;
}

async function update() {}
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
}
async function count(props: ICountProps) {
  const followers = await prisma.userFollowGroup.count({
    where: props,
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