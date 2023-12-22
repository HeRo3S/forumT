import cors from 'cors';
import { createServer } from 'http';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import credentials from './middleware/credentials.js';
import corsOptions from './config/corsOptions.js';

// BackupService.ReloadAttachmentDB

// *setup dotenv
dotenv.config();

// *setup middleware
const app = express();
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use('/', routes);
app.use(
  '/uploads',
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), 'uploads/')
  )
);

// *setup httpServer so it can be exported
const httpServer = createServer(app);

// *run app on specific port
httpServer.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

export default httpServer;
