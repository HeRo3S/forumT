import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import GroupData from '../data/group.data.js';
import PostData from '../data/post.data.js';
import UserFollowingGroupData from '../data/userFollowingGroup.data.js';

export async function CreateGroupController(req: Request, res: Response) {
  try {
    if (!req.user?.username)
      return res.status(403).json("can't find username in decoded jwt");
    const createdGroup = await GroupData.create({
      groupname: req.body.groupname,
      displayname: req.body.displayname,
      ownername: req.user.username as string,
    });
    if (createdGroup) {
      await UserFollowingGroupData.create({
        username: req.user.username,
        groupname: createdGroup.groupname,
        role: 'MODERATOR',
      });
    }
    return res.status(200).json(createdGroup);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        // return error if groupname has been created
        case 'P2002':
          res.status(409).json('This group has existed!');
          break;
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

export async function GetGroupInfo(req: Request, res: Response) {
  try {
    const groupInfo = await GroupData.read({
      groupname: req.params.groupname,
    });
    if (!groupInfo) {
      res.status(400).json('Cannot find group');
      return;
    }
    const nFollowers = await UserFollowingGroupData.count({
      groupname: groupInfo.groupname,
    });
    res.status(200).json({ groupInfo, nFollowers });
  } catch (err) {
    res.status(500).json(err);
    throw err;
  }
}
export async function SearchGroupsController(req: Request, res: Response) {
  try {
    const keyword = req.query.keyword as string;
    const groups = await GroupData.readContainKeyword({ keyword });
    return res.status(200).json(groups);
  } catch (err) {
    res.status(500).json(err);
    throw err;
  }
}

export async function GetGroupPostsController(req: Request, res: Response) {
  try {
    const groupname = req.params?.groupname;
    const groupPosts = await PostData.readMany({ groupname });
    return res.status(200).json(groupPosts);
  } catch (err) {
    res.status(500).json(err);
  }
}
