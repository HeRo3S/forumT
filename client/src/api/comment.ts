import { ResComment } from '../../types/interfaces/resAPI';
import instance from '.';

async function getPostComments(
  groupname: string,
  postID: string
): Promise<ResComment[]> {
  const response = await instance.get(`g/${groupname}/post/${postID}/comment`);
  return response.data;
}

const CommentService = { getPostComments };

export default CommentService;
