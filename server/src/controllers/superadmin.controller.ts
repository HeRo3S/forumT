import { NextFunction, Request, Response } from 'express';
import { UserType } from '@prisma/client';
import UserData from '../data/user.data.js';
import GroupData from '../data/group.data.js';
import PaginationSetup from '../config/pagination.js';

export async function CheckSuperAdminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user || !req.user.username) {
    res.status(401).json("can't found token");
    return;
  }
  const user = await UserData.read({
    username: req.user.username,
  });
  if (user?.userType !== UserType.SUPERADMIN) {
    res.status(401).json('User are not superadmin!');
    return;
  }
  next();
}
interface GetAllGroupsPaginationRequest extends Request {
  query: {
    limit: string;
    page: string;
    status: string[];
  };
}
export async function GetAllGroupsController(
  req: GetAllGroupsPaginationRequest,
  res: Response
) {
  const page = +req.query.page;
  const limit = +req.query.limit || PaginationSetup.SuperadminGroupLimit;
  const { status } = req.query;
  const groups = await GroupData.readManyWithPagination({
    limit,
    page,
    status,
  });
  const nPages = Math.ceil((await GroupData.count()) / limit);
  res.status(200).json({ groups, nPages });
}

export async function BlockGroupController(req: Request, res: Response) {
  const { groupname } = req.body;
  const group = await GroupData.update({
    groupname,
    status: 'BANNED',
  });
  res.status(200).json(group);
}

export async function UnBlockGroupController(req: Request, res: Response) {
  const { groupname } = req.body;
  const group = await GroupData.update({
    groupname,
    status: 'ACTIVE',
  });
  res.status(200).json(group);
}
