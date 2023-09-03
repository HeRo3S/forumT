import { Request, Response } from 'express';
import AttachmentData from '../data/attachment.data.js';
import CommentData from '../data/comment.data.js';
import PostData from '../data/post.data.js';
import PostReactionData from '../data/postReactions.data.js';
import UserFollowingGroupData from '../data/userFollowingGroup.data.js';
import PaginationSetup from '../config/pagination.js';

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

interface CursorPaginationRequest extends Request {
  query: {
    limit: string;
    cursor: string;
  };
}
const GuestGroupList = ['gaming', 'vietnam'];
export async function GetHomePagePostsGuestController(
  req: CursorPaginationRequest,
  res: Response
) {
  const take = +req.query.limit || PaginationSetup.DefaultPostsLimit;
  const cursorID = +req.query.cursor || undefined;
  const posts = await PostData.readMany({
    groupname: GuestGroupList,
    take,
    cursorID,
  });
  const nextCursorID = posts.length === take ? posts[posts.length - 1].id : -1;
  res.status(200).json({ posts, nextCursorID });
}

export async function GetHomePagePostsUserController(
  req: CursorPaginationRequest,
  res: Response
) {
  try {
    if (!req.user?.username) {
      res.status(403).json('unauthorized');
      return;
    }
    const userFollowGroup = await UserFollowingGroupData.readMany({
      username: req.user.username,
    });
    const groupLists = userFollowGroup.map((item) => item.groupname);

    const take = +req.query.limit || PaginationSetup.DefaultPostsLimit;
    const cursorID = +req.query.cursor || undefined;
    const posts = await PostData.readMany({
      groupname: groupLists,
      take,
      cursorID,
    });
    const nextCursorID =
      posts.length === take ? posts[posts.length - 1].id : -1;
    res.status(200).json({ posts, nextCursorID });
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function GetGroupPostsController(
  req: CursorPaginationRequest,
  res: Response
) {
  try {
    const groupname = req.params?.groupname;
    const take = +req.query.limit || PaginationSetup.DefaultPostsLimit;
    const cursorID = +req.query.cursor || undefined;
    const groupPosts = await PostData.readMany({
      groupname: [groupname],
      take,
      cursorID,
    });
    const nextCursorID =
      groupPosts.length === take ? groupPosts[groupPosts.length - 1].id : -1;
    return res.status(200).json({ groupPosts, nextCursorID });
  } catch (err) {
    res.status(500).json(err);
  }
}
