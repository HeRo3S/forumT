import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import credentials from './middleware/credentials.js';
import corsOptions from './config/corsOptions.js';

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

// *run app on specific port
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
