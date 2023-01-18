import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import routes from './routes/index.js';

// *setup dotenv
dotenv.config();

// *initialize, setup body parser, and setup route for express app
const app = express();
app.use(cors());
app.use(express.json());
app.use('/', routes);

// *run app on specific port
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
