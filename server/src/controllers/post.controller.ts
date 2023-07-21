import { Request, Response } from 'express';
import AttachmentData from '../data/attachment.data.js';
import CommentData from '../data/comment.data.js';
import PostData from '../data/post.data.js';
import PostReactionData from '../data/postReactions.data.js';

export async function GetPostController(req: Request, res: Response) {
  try {
    const postID = req.params?.postID;
    const post = await PostData.readOnly(+postID);
    const reactions = await PostReactionData.groupByPostID(+postID);
    const nComments = await CommentData.count({ parentPostID: +postID });
    const attachments = await AttachmentData.readMany({ postID: +postID });
    res.status(200).json({
      post,
      reaction: { reactions, nComments },
      attachments,
    });
  } catch (err) {
    res.status(500).json(err);
  }
}
