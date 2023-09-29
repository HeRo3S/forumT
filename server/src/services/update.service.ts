import CommentData from '../data/comment.data.js';
import PostReactionData from '../data/postReactions.data.js';

async function UpdateComments(
  username: string,
  groupname: string,
  postID: string,
  comment: string
) {
  const updatedComment = await CommentData.create({
    username,
    parentGroupname: groupname,
    parentPostID: +postID,
    content: comment,
  });
  return updatedComment;
}

async function UpdatePostReactions(
  username: string,
  postID: number,
  reaction: string
) {
  const existedReaction = await PostReactionData.read({ username, postID });
  const reactionID = existedReaction?.id;
  await PostReactionData.upsert({
    username,
    postID,
    reactionID,
    reaction,
  });
  const updateReactions = PostReactionData.groupByPostID(postID);
  return updateReactions;
}

const UpdateService = { UpdateComments, UpdatePostReactions };

export default UpdateService;
