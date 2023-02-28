import instance from '.';
import { ResGroupInfo, ResPost } from '../../types/interfaces/resAPI';

async function fetchDefaultPosts(): Promise<Partial<ResPost>[]> {
  const res = await instance.get(`g/gaming/posts`);
  return res.data;
}

const HomeService = {
  fetchDefaultPosts,
};

export default HomeService;
