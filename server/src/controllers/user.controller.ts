import { Prisma, UserInGroupType } from '@prisma/client';
import { Request, Response } from 'express';
import PostData from '../data/post.data.js';
import PostReactionData from '../data/postReactions.data.js';
import UserData from '../data/user.data.js';
import UserFollowingGroupData from '../data/userFollowingGroup.data.js';
import CommentData from '../data/comment.data.js';
import PaginationSetup from '../config/pagination.js';
import CloudinaryService from '../services/cloudinary.service.js';

export async function GetProfileController(req: Request, res: Response) {
  try {
    const { username } = req.params;
    const user = await UserData.read({ username });
    if (!user) return res.status(400).json("can't find user");
    const { password, ...result } = user;
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
}

export async function UpdateProfileController(req: Request, res: Response) {
  try {
    const username = req.user?.username;
    if (!username || username !== req.params.username)
      return res.status(401).json('unauthorized');
    const { displayname, description } = req.body;

    const updateUserProps = {
      username,
      displayname,
      description,
    } as {
      username: string;
      displayname?: string;
      description?: string;
      avatarURL?: string;
    };
    if (req.file) {
      const avatar = await CloudinaryService.uploadPhoto(req.file);
      updateUserProps.avatarURL = avatar?.secure_url || undefined;
    }
    const updatedUser = await UserData.update(updateUserProps);
    const { password, ...result } = updatedUser;
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function CreateGroupPostController(req: Request, res: Response) {
  try {
    const groupname = req.params?.groupname;
    if (!groupname) return res.status(400).json('cannot find group');
    const { title, content, type } = req.body;
    const username = <string>req.user?.username;
    const post = await PostData.create({
      username,
      groupname,
      title,
      type,
      content,
    });
    return res.status(200).json(post);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        default:
          res.status(500).json({ code: err.code, message: err.message });
          throw err;
      }
    } else {
      res.status(500).json(err);
      throw err;
    }
  }
}

export async function UpdateGroupPostController(req: Request, res: Response) {
  try {
    const { postID } = req.params;
    const { title, content, type } = req.body;
    const post = await PostData.update({ id: +postID, title, content });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
    throw err;
  }
}
interface CursorPaginationRequest extends Request {
  query: {
    limit: string;
    cursor: string;
  };
}
// TODO: config api with pagination
export async function GetUserPostsController(
  req: CursorPaginationRequest,
  res: Response
) {
  try {
    const { username } = req.params;
    const take = +req.query.limit || PaginationSetup.ProfilePostsLimit;
    const cursorID = +req.query.cursor || undefined;
    const posts = await PostData.readMany({ username, take, cursorID });
    const nextCursorID =
      posts.length === take ? posts[posts.length - 1].id : -1;
    return res.status(200).json({ posts, nextCursorID });
  } catch (err) {
    return res.status(500).json(err);
  }
}

export async function GetUsersCommentsController(
  req: CursorPaginationRequest,
  res: Response
) {
  try {
    const { username } = req.params;
    const take = +req.query.limit || PaginationSetup.ProfileCommentsLimit;
    const cursorID = +req.query.cursor || undefined;
    const comments = await CommentData.readManyWithUsername({
      username,
      cursorID,
      take,
    });
    const nextCursorID =
      comments.length === take ? comments[comments.length - 1].id : -1;
    return res.status(200).json({ comments, nextCursorID });
  } catch (err) {
    return res.status(500).json(err);
  }
}

export async function DeleteGroupPostController(req: Request, res: Response) {
  try {
    const groupname = req.params?.groupname;
    const postID = req.params?.postID;
    if (!groupname) return res.status(400).json('cannot find group');
    const username = <string>req.user?.username;
    const post = await PostData.readOnly(+postID);
    if (post?.username !== username)
      return res.status(401).json('unauthorized access');
    const transaction = await PostData.remove(+postID);
    return res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json(err);
    throw err;
  }
}

export async function GetUserPostReactController(req: Request, res: Response) {
  if (!req.user?.username) return res.status(400).json('cant find username');
  const userReact = await PostReactionData.read({
    username: req.user.username,
    postID: +req.params.postID,
  });
  return res.status(200).json(userReact);
}

export async function PostReactController(req: Request, res: Response) {
  try {
    if (!req.user?.username)
      return res.status(400).json('did not find username');
    const { username } = req.user;
    const postID = +req.params.postID;
    const { reaction } = req.body;
    const existedReaction = await PostReactionData.read({ username, postID });
    const reactionID = existedReaction?.id;
    const updatedReaction = await PostReactionData.upsert({
      username,
      postID,
      reactionID,
      reaction,
    });
    return res.status(200).json(updatedReaction);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        default:
          res.status(500).json({ code: err.code, message: err.message });
          throw err;
      }
    } else {
      res.status(500).json(err);
      throw err;
    }
  }
}

export async function GetGroupsUserFollowingController(
  req: Request,
  res: Response
) {
  try {
    const followingGroupList = await UserFollowingGroupData.readMany({
      username: req.params.username,
      role: 'USER',
      limit: 10000,
    });
    const result = followingGroupList.map((item) => item.group);
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
    throw err;
  }
}

export async function GetGroupsUserModeratingController(
  req: Request,
  res: Response
) {
  try {
    const moderatingGroupList = await UserFollowingGroupData.readMany({
      username: req.params.username,
      role: 'MODERATOR',
      limit: 10000,
    });
    const owningGroupList = await UserFollowingGroupData.readMany({
      username: req.params.username,
      role: 'OWNER',
      limit: 10000,
    });
    const result = [
      ...moderatingGroupList.map((item) => item.group),
      ...owningGroupList.map((item) => item.group),
    ];
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
    throw err;
  }
}

export async function CheckUserFollowingGroup(req: Request, res: Response) {
  try {
    if (!req.user?.username)
      return res.status(403).json("can't find username in decoded jwt");
    const followingGroupRecord = await UserFollowingGroupData.read({
      username: <string>req.user.username,
      groupname: req.params.groupname,
    });
    if (
      followingGroupRecord?.role === 'SOFTBANNED' &&
      followingGroupRecord.timeUnbanned.getTime() < new Date().getTime()
    ) {
      const updatedFollowingGroupRecord = await UserFollowingGroupData.update({
        username: followingGroupRecord.username,
        groupname: followingGroupRecord.groupname,
        role: UserInGroupType.USER,
      });
      return res.status(200).json(updatedFollowingGroupRecord);
    }
    return res.status(200).json(followingGroupRecord);
  } catch (err) {
    res.status(500).json(err);
    throw err;
  }
}

export async function CreateUserFollowingGroup(req: Request, res: Response) {
  try {
    if (!req.user?.username)
      return res.status(403).json("can't find username in decoded jwt");
    const result = await UserFollowingGroupData.create({
      username: <string>req.user.username,
      groupname: req.params.groupname,
    });
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
    throw err;
  }
}

export async function DeleteUserFollowingGroup(req: Request, res: Response) {
  try {
    if (!req.user?.username)
      return res.status(403).json("can't find username in decoded jwt");
    const followingGroupRecord = await UserFollowingGroupData.remove({
      username: <string>req.user.username,
      groupname: req.params.groupname,
    });
    return res.status(200).json(followingGroupRecord);
  } catch (err) {
    res.status(500).json(err);
    throw err;
  }
}
