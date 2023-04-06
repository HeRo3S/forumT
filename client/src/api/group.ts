import instance from '.';
import {
  ReactionStatsProps,
  ResAttachment,
  ResGroupInfo,
  ResPost,
} from '../../types/interfaces/resAPI';

interface IGetGroupInfo {
  groupInfo: ResGroupInfo;
  nFollowers: number;
}
async function getGroupInfo(groupname: string): Promise<IGetGroupInfo> {
  const res = await instance.get(`/g/${groupname}`);
  return res.data;
}

interface IResGetGroupPosts {
  post: ResPost;
  reaction: ReactionStatsProps;
  attachments: ResAttachment[];
}
async function getGroupPosts(groupname: string): Promise<IResGetGroupPosts[]> {
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
