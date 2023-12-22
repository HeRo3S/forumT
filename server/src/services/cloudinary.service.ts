import { UploadApiResponse } from 'cloudinary';
import cloudinary from '../config/cloudinary.js';

async function uploadPhoto(
  file: Express.Multer.File
): Promise<UploadApiResponse | null> {
  if (!file) return null;
  const result = await new Promise<UploadApiResponse | undefined>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'forumT' }, (error, res) => {
          if (error) {
            reject(error);
          } else {
            resolve(res);
          }
        })
        .end(file.buffer);
    }
  );
  return result || null;
}

const CloudinaryService = { uploadPhoto };

export default CloudinaryService;
