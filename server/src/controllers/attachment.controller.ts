import { Request, Response } from 'express';
import prisma from '../addons/prismaClient.js';

export default async function UploadController(req: Request, res: Response) {
  if (!req.file) return res.status(400).json('cannot find file');
  const { filename } = req.file;
  try {
    const attachment = await prisma.attachment.create({
      data: {
        postID: +req.body.postID,
        type: 'PNG',
        url: `uploads/${filename}`,
      },
    });
    res.status(200).json(attachment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
