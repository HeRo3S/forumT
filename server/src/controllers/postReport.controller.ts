import { Request, Response } from 'express';
import PostReportData from '../data/postReport.data.js';

export async function GetPostReportsControllers(req: Request, res: Response) {
  try {
    const reports = await PostReportData.groupByPostID({
      postID: +req.params.postID,
    });
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function CreatePostReportsControllers(
  req: Request,
  res: Response
) {
  try {
    if (!req.user) res.status(401).json("can't find user token!");
    const report = await PostReportData.create({
      username: req.user?.username as string,
      postID: +req.params.postID,
      bannedReason: req.body.bannedReason,
    });
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json(err);
  }
}
