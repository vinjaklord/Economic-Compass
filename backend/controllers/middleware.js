import axios from 'axios';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
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
        `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=FOREX:USD,FOREX:EUR,FOREX:GBP,FOREX:JPY,FOREX:CHF&limit=500&apikey=${process.env.NEWS_KEY}`
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

export { schedule, getToken, checkHash, scheduleNews };
