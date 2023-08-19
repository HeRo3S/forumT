import { UserInGroupType } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import UserFollowingGroupData from '../data/userFollowingGroup.data.js';

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
    !userFollowingGroup ||
    userFollowingGroup.role !== UserInGroupType.MODERATOR
  ) {
    res.status(401).json('Not mod of this group');
    return;
  }
  next();
}

export async function GetUsersFollowGroupModController(
  req: Request,
  res: Response
) {
  try {
    const usersfollowinggroup = await UserFollowingGroupData.readMany({
      groupname: req.params.groupname,
    });
    const users = usersfollowinggroup.map(({ group, ...result }) => result);
    res.status(200).json(users);
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
    const { username, timeUnbanned, role } = req.body;
    const userFollowingGroup = await UserFollowingGroupData.update({
      username,
      groupname,
      timeUnbanned,
      role,
    });
    res.status(200).json(userFollowingGroup);
  } catch (err) {
    res.status(500).json(err);
  }
}
