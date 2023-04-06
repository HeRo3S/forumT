import instance from '.';
import {
  ReactionStatsProps,
  ResAttachment,
  ResPost,
} from '../../types/interfaces/resAPI';

interface IResFetchDefaultPosts {
  post: ResPost;
  reaction: ReactionStatsProps;
  attachments: ResAttachment[];
}
async function fetchDefaultPosts(): Promise<IResFetchDefaultPosts[]> {
  const res = await instance.get(`g/gaming/posts`);
  return res.data;
}

const HomeService = {
  fetchDefaultPosts,
};

export default HomeService;
