import dotenv from 'dotenv';
import express from 'express';

// *setup dotenv
dotenv.config();

const app = express();

const PORT = 5000;

app.get('/test', (req, res) => {
  res.status(200).send('Hello World');
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
