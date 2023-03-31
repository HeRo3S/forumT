import instance from '.';
import { ReactionStatsProps, ResPost } from '../../types/interfaces/resAPI';

interface IResFetchDefaultPosts {
  post: ResPost;
  reaction: ReactionStatsProps;
}
async function fetchDefaultPosts(): Promise<IResFetchDefaultPosts[]> {
  const res = await instance.get(`g/gaming/posts`);
  return res.data;
}

const HomeService = {
  fetchDefaultPosts,
};

export default HomeService;
