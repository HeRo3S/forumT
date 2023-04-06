import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../addons/prismaClient.js';
import SearchService from '../services/search.service.js';

export async function CreateGroupController(req: Request, res: Response) {
  try {
    if (!req.user?.username)
      return res.status(403).json("can't find username in decoded jwt");
    const createdGroup = await prisma.group.create({
      data: {
        groupname: req.body.groupname,
        displayname: req.body.displayname,
        ownername: req.user.username as string,
      },
    });
    if (createdGroup) {
      await prisma.userFollowGroup.create({
        data: {
          username: req.user.username,
          groupname: createdGroup.groupname,
          role: 'MODERATOR',
        },
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
    const groupInfo = await prisma.group.findUnique({
      where: {
        groupname: req.params.groupname,
      },
    });
    if (!groupInfo) res.status(400).json('Cannot find group');
    const nFollowers = await prisma.userFollowGroup.count({
      where: {
        groupname: groupInfo?.groupname,
      },
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
    const groups = await SearchService.SearchGroups(keyword);
    return res.status(200).json(groups);
  } catch (err) {
    res.status(500).json(err);
    throw err;
  }
}

export async function GetGroupPostsController(req: Request, res: Response) {
  try {
    const groupname = req.params?.groupname;
    const groupPosts = await prisma.post.findMany({
      where: {
        groupname,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const response: object[] = [];
    await Promise.all(
      groupPosts.map(async (p) => {
        const { id } = p;
        const nUpvote = await prisma.postReaction.count({
          where: {
            postID: +id,
            reaction: 'UPVOTE',
          },
        });
        const nDownvote = await prisma.postReaction.count({
          where: {
            postID: +id,
            reaction: 'DOWNVOTE',
          },
        });
        const nComments = await prisma.comment.count({
          where: {
            parentPostID: +id,
          },
        });
        const attachments = await prisma.attachment.findMany({
          where: {
            postID: +id,
          },
          orderBy: {
            id: 'desc',
          },
        });
        response.push({
          post: p,
          reaction: { nUpvote, nDownvote, nComments },
          attachments,
        });
      })
    );
    return res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
}
