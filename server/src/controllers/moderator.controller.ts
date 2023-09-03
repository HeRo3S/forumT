import { UserInGroupType } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import UserFollowingGroupData from '../data/userFollowingGroup.data.js';
import PostData from '../data/post.data.js';
import GroupData from '../data/group.data.js';
import PaginationSetup from '../config/pagination.js';

export async function CheckModeratorMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    res.status(401).json("Can't find user");
    return;
  }
  const username = req.user.username as string;
  const { groupname } = req.params;
  const userFollowingGroup = await UserFollowingGroupData.read({
    username,
    groupname,
  });
  if (
    userFollowingGroup &&
    (userFollowingGroup.role === UserInGroupType.MODERATOR ||
      userFollowingGroup.role === UserInGroupType.OWNER)
  ) {
    next();
  } else {
    res.status(401).json('Not mod of this group');
  }
}

export async function CheckOwnerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    res.status(401).json("Can't find user");
    return;
  }
  const username = req.user.username as string;
  const { groupname } = req.params;
  const userFollowingGroup = await UserFollowingGroupData.read({
    username,
    groupname,
  });
  if (
    !userFollowingGroup ||
    userFollowingGroup.role !== UserInGroupType.OWNER
  ) {
    res.status(401).json('Not owner of this group');
    return;
  }
  next();
}

export async function UpdateGroupInfoController(req: Request, res: Response) {
  try {
    const { groupname } = req.params;
    const { displayname, description } = req.body;
    const updateGroupProps = {
      groupname,
      description,
      displayname,
    } as {
      groupname: string;
      description: string;
      displayname: string;
      avatarURL: string;
    };
    if (req.file) updateGroupProps.avatarURL = `uploads/${req.file.filename}`;
    const updatedGroupInfo = await GroupData.update(updateGroupProps);
    res.status(200).json(updatedGroupInfo);
  } catch (err) {
    res.status(500).json(err);
  }
}

interface IGetUsersFollowGroupModControllerRequest extends Request {
  query: {
    role: string;
    limit: string;
    page: string;
  };
}
// TODO: setup pagination here
export async function GetUsersFollowGroupModController(
  req: IGetUsersFollowGroupModControllerRequest,
  res: Response
) {
  try {
    const { groupname } = req.params;
    const { role, page } = req.query;
    const limit = +req.query.limit || PaginationSetup.UsersFollowingGroupLimit;
    const usersFollowingGroup = await UserFollowingGroupData.readMany({
      groupname,
      role,
      limit,
      page: +page,
    });
    const count = await UserFollowingGroupData.count({
      groupname,
      role,
    });
    let users = usersFollowingGroup.map(({ group, ...result }) => result);

    if (role === 'MODERATOR') {
      const owner = await UserFollowingGroupData.readMany({
        groupname,
        role: 'OWNER',
        limit,
        page: +page,
      });
      users = [...owner.map(({ group, ...result }) => result), ...users];
    }
    const nPages = Math.ceil(count / limit);
    res.status(200).json({ users, nPages });
  } catch (err) {
    res.status(500).json(err);
  }
}
export async function PromoteUserToModOwnerController(
  req: Request,
  res: Response
) {
  try {
    const { groupname } = req.params;
    const { username } = req.body;
    const userFollowingGroup = await UserFollowingGroupData.update({
      username,
      groupname,
      role: UserInGroupType.MODERATOR,
    });
    res.status(200).json(userFollowingGroup);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function DemoteUserToModOwnerController(
  req: Request,
  res: Response
) {
  try {
    const { groupname } = req.params;
    const { username } = req.body;
    const userFollowingGroup = await UserFollowingGroupData.update({
      username,
      groupname,
      role: UserInGroupType.USER,
    });
    res.status(200).json(userFollowingGroup);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function BanUsersFromGroupModController(
  req: Request,
  res: Response
) {
  try {
    const { groupname } = req.params;
    const { username, banTime } = req.body;
    const userFollowingGroup = await UserFollowingGroupData.update({
      username,
      groupname,
      banTime,
      role: UserInGroupType.SOFTBANNED,
    });
    res.status(200).json(userFollowingGroup);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function UnbanUsersFromGroupController(
  req: Request,
  res: Response
) {
  try {
    const { groupname } = req.params;
    const { username } = req.body;
    const userFollowingGroup = await UserFollowingGroupData.update({
      username,
      groupname,
      banTime: '0',
      role: UserInGroupType.USER,
    });
    res.status(200).json(userFollowingGroup);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function SoftDeleteGroupPost(req: Request, res: Response) {
  try {
    const { postID } = req.body;
    const deletedAt = new Date(Date.now());
    const post = await PostData.update({ id: postID, deletedAt });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function RestoreDeletedPost(req: Request, res: Response) {
  try {
    const { postID } = req.body;
    const deletedAt = null;
    const post = await PostData.update({ id: postID, deletedAt });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function HardDeletePost(req: Request, res: Response) {
  try {
    const { postID } = req.params;
    if (!postID) {
      res.status(400).json("Can't find postID in URL");
      return;
    }
    const post = await PostData.remove(+postID);
    if (post) res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
  }
}
