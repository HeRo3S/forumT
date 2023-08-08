import instance from '.';
import { ResPost } from '../../types/interfaces/resAPI';

interface IResHomePosts {
  posts: ResPost[];
  nextCursorID: number;
}
async function basicFetcher(url: string): Promise<IResHomePosts> {
  const res = await instance.get(url);
  return res.data;
}

const HomeService = {
  basicFetcher,
};

export default HomeService;
