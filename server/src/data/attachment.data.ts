import { Attachment, AttachmentType } from '@prisma/client';
import prisma from '../addons/prismaClient.js';

interface ICreateProps {
  postID: number;
  type: AttachmentType;
  url: string;
}
async function create(props: ICreateProps) {
  const { postID, type, url } = props;
  const attachment: Attachment = await prisma.attachment.create({
    data: {
      postID,
      type,
      url,
    },
  });
  return attachment;
}

interface IReadManyProps {
  postID: number;
}
async function readMany(props: IReadManyProps) {
  const attachments = await prisma.attachment.findMany({
    where: props,
  });
  return attachments;
}

function update() {}
function remove() {}

const AttachmentData = { create, readMany, update, remove };

export default AttachmentData;
