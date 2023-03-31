import multer from 'multer';

const upload = multer({
  limits: { fieldSize: 25 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'dist/uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

export default upload;
