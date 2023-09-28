import instance from '.';
import { ResGroupInfo } from '../../types/interfaces/resAPI';

async function basicFetcher(url: string) {
  const res = await instance.get(url);
  return res;
}

interface IResGroupsList {
  groups: ResGroupInfo[];
  nPages: number;
}
async function getAllGroups(
  status: string[],
  limit: number,
  page: number
): Promise<IResGroupsList> {
  let url = `superadmin/groups/list?limit=${limit}&page=${page}`;
  status.forEach((s) => {
    url += `&status[]=${s}`;
  });
  const res = await instance.get(
    // `superadmin/groups/list?limit=${limit}&page=${page}`
    url
  );
  return res.data;
}

async function banGroup(groupname: string): Promise<ResGroupInfo> {
  const res = await instance.post(`superadmin/groups/ban`, { groupname });
  return res.data;
}

async function unbanGroup(groupname: string): Promise<ResGroupInfo> {
  const res = await instance.post(`superadmin/groups/unban`, { groupname });
  return res.data;
}

const SuperAdminService = {
  basicFetcher,
  getAllGroups,
  banGroup,
  unbanGroup,
};

export default SuperAdminService;
