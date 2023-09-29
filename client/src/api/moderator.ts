import instance from '.';
import {
  ResGroupByPostReports,
  ResUserFollowingGroup,
} from '../../types/interfaces/resAPI';

interface IUpdateGroupInfoProps {
  groupname: string;
  formData: FormData;
}
async function updateGroupInfo(props: IUpdateGroupInfoProps) {
  const { groupname, formData } = props;
  const res = await instance.post(`/g/${groupname}/manage/update`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
}

interface IResUserFollowingGroup {
  users: ResUserFollowingGroup[];
  nPages: number;
}
async function fetchUserFollowingGroups(
  groupname: string,
  limit: number,
  page: number,
  role: string
): Promise<IResUserFollowingGroup> {
  const res = await instance.get(
    `/g/${groupname}/manage/users/list?page=${page}&limit=${limit}&role=${role}`
  );
  return res.data;
}

async function fetchPostReports(
  groupname: string,
  postID: number
): Promise<ResGroupByPostReports[]> {
  const res = await instance.get(`/g/${groupname}/post/${postID}/report`);
  return res.data;
}

async function banUser(
  groupname: string,
  banTime: string,
  username: string
): Promise<ResUserFollowingGroup> {
  const res = await instance.post(`g/${groupname}/manage/users/ban`, {
    username,
    banTime,
  });
  return res.data;
}

async function unbanUser(groupname: string, username: string) {
  const res = await instance.post(`g/${groupname}/manage/users/unban`, {
    username,
  });
  return res.data;
}

async function promoteUserToMod(groupname: string, username: string) {
  const res = await instance.post(`g/${groupname}/manage/users/promote`, {
    username,
  });
  return res.data;
}

async function demoteModToUser(groupname: string, username: string) {
  const res = await instance.post(`g/${groupname}/manage/users/demote`, {
    username,
  });
  return res.data;
}

async function hardDeletePost(groupname: string, postID: number) {
  const res = await instance.get(
    `g/${groupname}/manage/posts/delete/${postID}`
  );
  return res;
}

const ModeratorService = {
  updateGroupInfo,
  fetchUserFollowingGroups,
  fetchPostReports,
  banUser,
  unbanUser,
  promoteUserToMod,
  demoteModToUser,
  hardDeletePost,
};

export default ModeratorService;
