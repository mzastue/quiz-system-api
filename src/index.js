import express from 'express';
import './config/dotenv';
import './config/db';

const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on ${host}:${port}`);
});