import instance from '.';
import { ResPost } from '../../types/interfaces/resAPI';

async function fetchDefaultPosts(): Promise<ResPost[]> {
  const res = await instance.get(`g/gaming/posts`);
  return res.data;
}

const HomeService = {
  fetchDefaultPosts,
};

export default HomeService;
