import instance from '.';
import {
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

const GroupService = {
  createGroup,
  getGroupInfo,
  getGroupPosts,
  searchGroups,
  fetchGroupsUserFollowing,
  fetchGroupsUserModerating,
};

export default GroupService;
