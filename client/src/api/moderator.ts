import instance from '.';
import {
  ResGroupByPostReports,
  ResUserFollowingGroup,
} from '../../types/interfaces/resAPI';

async function fetchUserFollowingGroups(
  groupname: string
): Promise<ResUserFollowingGroup[]> {
  const res = await instance.get(`/g/${groupname}/mod/users`);
  return res.data;
}

async function fetchPostReports(
  groupname: string,
  postID: number
): Promise<ResGroupByPostReports[]> {
  const res = await instance.get(`/g/${groupname}/post/${postID}/report`);
  return res.data;
}

const ModeratorService = { fetchUserFollowingGroups, fetchPostReports };

export default ModeratorService;
