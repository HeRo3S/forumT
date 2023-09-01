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

async function fetchUserFollowingGroups(
  groupname: string
): Promise<ResUserFollowingGroup[]> {
  const res = await instance.get(`/g/${groupname}/manage/users/list`);
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
  hardDeletePost,
};

export default ModeratorService;
