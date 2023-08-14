import instance from '.';
import { ReqPost } from '../../types/interfaces/reqAPI';
import {
  ReactionStatsProps,
  ResAttachment,
  ResComment,
  ResPost,
  ResPostReact,
  ResPostReports,
} from '../../types/interfaces/resAPI';

interface IGetPostInfo {
  post: ResPost;
  reaction: ReactionStatsProps;
  attachments: ResAttachment[];
}

async function getPostInfo(
  groupname: string,
  postID: string
): Promise<IGetPostInfo> {
  const response = await instance.get(`/g/${groupname}/post/${postID}`);
  return response.data;
}

async function createPost(groupname: string, post: ReqPost): Promise<ResPost> {
  const response = await instance.post(`/g/${groupname}/post/create`, post);
  return response.data;
}

async function uploadFile(formData: FormData) {
  const response = await instance.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

async function deletePost(groupname: string, postID: number) {
  const response = await instance.post(`/g/${groupname}/post/${postID}/delete`);
  return response;
}

async function getUserReact(
  groupname: string,
  parentPostID: number
): Promise<ResPostReact> {
  const response = await instance.get(
    `/g/${groupname}/post/${parentPostID}/react`
  );
  return response.data;
}

async function postUserReact(
  groupname: string,
  postID: number,
  reaction: string
): Promise<ResPostReact> {
  const response = await instance.post(`/g/${groupname}/post/${postID}/react`, {
    reaction,
  });
  return response.data;
}

async function getComments(
  groupname: string,
  parentPostID: number
): Promise<ResComment[]> {
  const response = await instance.get(
    `g/${groupname}/post/${parentPostID}/comments`
  );
  return response.data;
}

async function postComment(
  groupname: string,
  parentPostID: number,
  content: string
): Promise<ResComment> {
  const response = await instance.post(
    `g/${groupname}/post/${parentPostID}/comment`,
    { content }
  );
  return response.data;
}

async function postReport(
  groupname: string,
  parentPostID: number,
  bannedReason: string
): Promise<ResPostReports> {
  const response = await instance.post(
    `g/${groupname}/post/${parentPostID}/report`,
    { bannedReason }
  );
  return response.data;
}

const PostService = {
  getPostInfo,
  createPost,
  uploadFile,
  deletePost,
  getUserReact,
  postUserReact,
  getComments,
  postComment,
  postReport,
};

export default PostService;
