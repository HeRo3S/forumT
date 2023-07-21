import instance from '.';
import { ResUserFollowingGroup } from '../../types/interfaces/resAPI';

async function fetchUserFollowingGroups(
  groupname: string
): Promise<ResUserFollowingGroup[]> {
  const res = await instance.get(`/g/${groupname}/mod/users`);
  return res.data;
}

const ModeratorService = { fetchUserFollowingGroups };

export default ModeratorService;
