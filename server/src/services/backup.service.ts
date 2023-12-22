import * as fs from 'fs';
import path from 'path';
import prisma from '../addons/prismaClient';
import cloudinary from '../config/cloudinary';
import AttachmentData from '../data/attachment.data';

async function ReloadAttachmentDB() {
  try {
    const files = fs.readdirSync(
      path.join(path.dirname(fileURLToPath(import.meta.url)), 'uploads/')
    );
    files.forEach(async (f) => {
      console.log(f);
      try {
        const result = await cloudinary.uploader.upload(
          path.join(
            path.dirname(fileURLToPath(import.meta.url)),
            'uploads/',
            f
          ),
          { use_filename: true, folder: 'forumt' }
        );
        console.log(result);
        const attachment = await AttachmentData.updateUsingURL({
          url: path.join('uploads/', f),
          newUrl: result.secure_url,
        });
        console.log(attachment);
        const user = await prisma.user.updateMany({
          where: {
            avatarURL: path.join('uploads/', f),
          },
          data: {
            avatarURL: result.secure_url,
          },
        });
        console.log(user);
        const group = await prisma.group.updateMany({
          where: {
            avatarURL: path.join('uploads/', f),
          },
          data: {
            avatarURL: result.secure_url,
          },
        });
        console.log(group);
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

const BackupService = { ReloadAttachmentDB };

export default BackupService;

