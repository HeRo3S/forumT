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

interface IUpdateUsingURL {
  url: string;
  newUrl: string;
}
async function updateUsingURL(props: IUpdateUsingURL) {
  const { url, newUrl } = props;
  const attachment = await prisma.attachment.updateMany({
    where: {
      url,
    },
    data: {
      url: newUrl,
    },
  });
  return attachment;
}
function remove() {}

const AttachmentData = { create, readMany, update, updateUsingURL, remove };

export default AttachmentData;
