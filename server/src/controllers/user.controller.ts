import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../addons/prismaClient.js';

export async function CreateGroupPostController(req: Request, res: Response) {
  try {
    const groupname = req.params?.groupname;
    if (!groupname) return res.status(400).json('cannot find group');
    const { title, content, type } = req.body;
    const username = <string>req.user?.username;
    const post = await prisma.post.create({
      data: {
        username,
        groupname,
        title,
        type,
        content,
      },
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

export async function GetUserPostReactController(req: Request, res: Response) {
  if (!req.user?.username) return res.status(400).json('cant find username');
  const userReact = await prisma.postReaction.findFirst({
    where: {
      username: req.user.username,
      postID: +req.params.postID,
    },
  });
  return res.status(200).json(userReact);
}

export async function PostReactController(req: Request, res: Response) {
  try {
    if (!req.user?.username)
      return res.status(400).json('did not find username');
    const existedReaction = await prisma.postReaction.findFirst({
      where: {
        username: req.user.username,
        postID: +req.params.postID,
      },
    });
    if (!existedReaction) {
      const newReaction = await prisma.postReaction.create({
        data: {
          username: req.user.username,
          reaction: req.body.reaction,
          postID: +req.params.postID,
        },
      });
      return res.status(200).json(newReaction);
    }
    const updatedReaction = await prisma.postReaction.update({
      where: {
        id: existedReaction.id,
      },
      data: {
        reaction: req.body.reaction,
      },
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
    if (!req.user?.username)
      return res.status(403).json("can't find username in decoded jwt");
    const followingGroupList = await prisma.userFollowGroup.findMany({
      where: {
        username: req.user.username,
        role: 'USER',
      },
      select: {
        group: true,
      },
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
    if (!req.user?.username)
      return res.status(403).json("can't find username in decoded jwt");
    const moderatingGroupList = await prisma.userFollowGroup.findMany({
      where: {
        username: req.user.username,
        role: 'MODERATOR',
      },
      select: {
        group: true,
      },
    });
    const result = moderatingGroupList.map((item) => item.group);
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
    const followingGroupRecord = await prisma.userFollowGroup.findUnique({
      where: {
        username_groupname: {
          username: <string>req.user.username,
          groupname: req.body.groupname,
        },
      },
    });
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
  } catch (err) {
    res.status(500).json(err);
    throw err;
  }
}
