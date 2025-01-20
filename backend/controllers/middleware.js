import axios from 'axios';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

import cron from 'node-cron';
import { Economics } from '../models/news.js';

function schedule() {
  cron.schedule('*/30 * * * *', async () => {
    try {
      const response = await axios.get(
        'https://nfs.faireconomy.media/ff_calendar_thisweek.json'
      );
      const data = response.data;

      await Economics.deleteMany({});
      await Economics.create(data);

      console.log('Database updated successfully at', new Date().toISOString());
    } catch (error) {
      console.error('Error fetching API data | ', error.message);
    }
  });
}

const getToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '1h' });

  return token;
};
const checkHash = (plainText, hashText) => {
  return bcrypt.compareSync(plainText, hashText);
};

export { schedule, getToken, checkHash };
