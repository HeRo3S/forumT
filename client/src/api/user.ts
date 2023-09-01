import instance from '.';
import {
  ResComment,
  ResGroupInfo,
  ResPost,
  ResUserInfo,
} from '../../types/interfaces/resAPI';

interface IDefaultUserProps {
  username: string;
}

async function fetchUserInfo(
  props: IDefaultUserProps
): Promise<Partial<ResUserInfo>> {
  const { username } = props;
  const res = await instance.get(`u/${username}/`);
  return res.data;
}

interface IUpdateUserInfoProps extends IDefaultUserProps {
  formData: FormData;
}
async function updateUserInfo(
  props: IUpdateUserInfoProps
): Promise<Partial<ResUserInfo>> {
  const { username, formData } = props;
  const res = await instance.post(`u/${username}/update/info`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
}

interface IResUserPostsPaginationPage {
  posts: ResPost[];
  nextCursorID: number;
}
async function fetchUserPosts(
  url: string
): Promise<IResUserPostsPaginationPage> {
  const res = await instance.get(url);
  return res.data;
}

interface IResUserCommentsPaginationPage {
  comments: ResComment[];
  nextCursorID: number;
}
async function fetchUserComments(
  url: string
): Promise<IResUserCommentsPaginationPage> {
  const res = await instance.get(url);
  return res.data;
}

async function fetchGroupsUserFollowing(
  props: IDefaultUserProps
): Promise<Partial<ResGroupInfo>[]> {
  const { username } = props;
  const res = await instance.get(`u/${username}/following`);
  return res.data;
}

async function fetchGroupsUserModerating(
  props: IDefaultUserProps
): Promise<Partial<ResGroupInfo>[]> {
  const { username } = props;
  const res = await instance.get(`u/${username}/moderating`);
  return res.data;
}

const UserService = {
  fetchUserInfo,
  updateUserInfo,
  fetchUserPosts,
  fetchUserComments,
  fetchGroupsUserModerating,
  fetchGroupsUserFollowing,
};

export default UserService;
