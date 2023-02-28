import instance from '.';
import { ResPost } from '../../types/interfaces/resAPI';

async function getPostInfo(
  groupname: string,
  postID: string
): Promise<ResPost> {
  const response = await instance.get(`/g/${groupname}/post/${postID}`);
  return response.data;
}

const PostService = { getPostInfo };

export default PostService;
