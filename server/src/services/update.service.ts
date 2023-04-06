import prisma from '../addons/prismaClient.js';

async function UpdateComments(
  username: string,
  postID: string,
  comment: string
) {
  const updatedComment = await prisma.comment.create({
    data: {
      parentPostID: +postID,
      username,
      content: comment,
    },
  });
  return updatedComment;
}

const UpdateService = { UpdateComments };

export default UpdateService;
