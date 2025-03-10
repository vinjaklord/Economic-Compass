import axios from 'axios';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { Member } from '../models/members.js';
import HttpError from '../models/http-error.js';
dotenv.config();

import cron from 'node-cron';
import { Economics, News } from '../models/news.js';

function schedule() {
  cron.schedule('0 * * * *', async () => {
    try {
      const response = await axios.get(
        'https://nfs.faireconomy.media/ff_calendar_thisweek.json'
      );
      const data = response.data;

      await Economics.deleteMany({});
      await Economics.create(data);

      console.log('Calendar updated successfully at', new Date().toISOString());
    } catch (error) {
      console.error('Error fetching API data | ', error.message);
    }
  });
}

function scheduleNews() {
  cron.schedule('0 * * * *', async () => {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&FOREX:EUR,FOREX:USD,FOREX:GBP,FOREX:JPY,FOREX:CHF,FOREX:CNY&time_from=20250201T0000&limit=300&apikey=${process.env.NEWS_TOKEN}`
      );
      const data = response.data;

      await News.deleteMany({});
      await News.create(data);

      console.log('News updated successfully at', new Date().toISOString());
    } catch (error) {
      console.error('Error fetching API data | ', error.message);
    }
  });
}

const getToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_KEY);

  return token;
};

const checkHash = (plainText, hashText) => {
  return bcrypt.compareSync(plainText, hashText);
};

const checkToken = async (req, res, next) => {
  //Check Header for Token
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new HttpError('invalid token', 401);
    }

    const token = authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // console.log(decoded)

    const { id } = decoded;

    const member = await Member.findById(id);

    if (!member) {
      throw HttpError('invalid token', 401);
    }

    req.verifiedMember = member;

    next();
  } catch (error) {
    return next(new HttpError(error, error.errorCode || 500));
  }

  //Token check (Still valid? Id pressent?)
};

export { schedule, getToken, checkHash, scheduleNews, checkToken };
