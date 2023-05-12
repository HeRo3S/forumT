import instance from '.';
import {
  ResUserFollowingGroup,
  ReactionStatsProps,
  ResAttachment,
  ResGroupInfo,
  ResPost,
} from '../../types/interfaces/resAPI';

async function createGroup(groupname: string, displayname: string) {
  const res = await instance.post('/g/create', { groupname, displayname });
  return res.data;
}

interface IGetGroupInfo {
  groupInfo: ResGroupInfo;
  nFollowers: number;
}
async function getGroupInfo(groupname: string): Promise<IGetGroupInfo> {
  const res = await instance.get(`/g/${groupname}`);
  return res.data;
}

async function getGroupPosts(groupname: string): Promise<ResPost[]> {
  const res = await instance.get(`/g/${groupname}/posts`);
  return res.data;
}

async function searchGroups(keyword: string): Promise<Partial<ResGroupInfo>[]> {
  const res = await instance.get(`g/search?keyword=${keyword}`);
  return res.data;
}

async function fetchGroupsUserFollowing(): Promise<Partial<ResGroupInfo>[]> {
  const res = await instance.get(`g/following`);
  return res.data;
}

async function fetchGroupsUserModerating(): Promise<Partial<ResGroupInfo>[]> {
  const res = await instance.get(`g/moderating`);
  return res.data;
}

async function checkUserFollowingGroup(
  groupname: string
): Promise<ResUserFollowingGroup> {
  const res = await instance.get(`g/${groupname}/follow`);
  return res.data;
}

async function followGroup(groupname: string): Promise<ResUserFollowingGroup> {
  const res = await instance.post(`g/${groupname}/follow`);
  return res.data;
}

async function unfollowGroup(groupname: string) {
  const res = await instance.post(`g/${groupname}/unfollow`);
  return res.data;
}

const GroupService = {
  createGroup,
  getGroupInfo,
  getGroupPosts,
  searchGroups,
  fetchGroupsUserFollowing,
  checkUserFollowingGroup,
  fetchGroupsUserModerating,
  followGroup,
  unfollowGroup,
};

export default GroupService;
