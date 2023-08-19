import { AttachmentType } from '@prisma/client';
import { Request, Response } from 'express';
import AttachmentData from '../data/attachment.data.js';

export default async function UploadController(req: Request, res: Response) {
  if (!req.file) return res.status(400).json('cannot find file');
  const { filename } = req.file;
  try {
    const attachment = await AttachmentData.create({
      postID: +req.body.postID,
      type: AttachmentType.PNG,
      url: `uploads/${filename}`,
    });
    res.status(200).json(attachment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
