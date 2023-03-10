import instance from '.';
import { ResGroupInfo, ResPost } from '../../types/interfaces/resAPI';

async function getGroupInfo(groupname: string): Promise<ResGroupInfo> {
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

const GroupService = {
  getGroupInfo,
  getGroupPosts,
  searchGroups,
  fetchGroupsUserFollowing,
};

export default GroupService;
