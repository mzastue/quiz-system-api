import './config/dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './config/router';
import './config/db';

const app = express();

app.use(bodyParser());
app.use(cors());
app.use('/api', router(express));

app.listen();
