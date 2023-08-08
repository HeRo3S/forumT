import instance from '.';
import {
  ResUserFollowingGroup,
  ReactionStatsProps,
  ResAttachment,
  ResGroupInfo,
  ResPost,
} from '../../types/interfaces/resAPI';
import PaginationConfig from '../config/axios/pagination';

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

interface IGetGroupPost {
  groupPosts: ResPost[];
  nextCursorID: number;
}
async function getGroupPosts(url: string): Promise<IGetGroupPost> {
  const res = await instance.get(url);
  return res.data;
}

async function searchGroups(keyword: string): Promise<Partial<ResGroupInfo>[]> {
  const res = await instance.get(`g/search?keyword=${keyword}`);
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
  checkUserFollowingGroup,
  followGroup,
  unfollowGroup,
};

export default GroupService;
