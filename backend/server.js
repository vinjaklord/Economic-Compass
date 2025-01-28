import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { schedule } from './controllers/middleware.js';
dotenv.config();
import router from './router/router.js';
import mongoose from 'mongoose';

const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const PORT = process.env.PORT;
const CONNECTION = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.kpi57.mongodb.net/`;
const app = express();

schedule();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
// Middleware
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
    },
  })
);

app.use(express.json());

app.use('/', router);

mongoose
  .connect(CONNECTION)
  .then(() => {
    // SERVER START
    app.listen(PORT, () => {
      console.log('http://localhost:3000');
    });
  })
  .catch((err) => {
    console.log('Error while connecting | ', err);
  });
