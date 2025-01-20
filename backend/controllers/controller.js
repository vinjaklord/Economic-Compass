import { formatInTimeZone } from 'date-fns-tz';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { validationResult, matchedData } from 'express-validator';
import { getToken, checkHash } from './middleware.js';

import HttpError from '../models/http-error.js';
import { Password, Member } from '../models/members.js';
import { Economics } from '../models/news.js';

const allCalendar = async (req, res) => {
  try {
    // const data = fs.readFileSync("./data.json", "utf8");
    const data = await Economics.find(
      {},
      'title country date impact forecast previous -_id'
    ).lean();

    res.json(data);
  } catch (error) {
    console.error('Error fetching API data from data.json  |  ', error.message);
  }
};

const whatDay = async (req, res) => {
  try {
    const day = req.params.day;

    const data = await Economics.find(
      {},
      'title date impact forecast previous -_id'
    ).lean();

    const today = new Date();
    const todayDate = formatInTimeZone(today, 'America/New_York', 'yyyy-MM-dd');

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowDate = formatInTimeZone(
      tomorrow,
      'America/New_York',
      'yyyy-MM-dd'
    );

    if (day === 'today') {
      const today = data.filter((i) => {
        const itemDate = formatInTimeZone(
          new Date(i.date),
          'America/New_York',
          'yyyy-MM-dd'
        );
        return itemDate === todayDate;
      });
      res.json(today);
    }

    if (day === 'tomorrow') {
      const tomorrow = data.filter((i) => {
        const itemDate = formatInTimeZone(
          new Date(i.date),
          'America/New_York',
          'yyyy-MM-dd'
        );
        return itemDate === tomorrowDate;
      });
      res.json(tomorrow);
    }
  } catch (error) {
    console.error('Error fetching API data from data.json  |  ', error.message);
  }
};

//////////////////////////////////////////////////////////////////////////////////

const signup = async (req, res, next) => {
  // Validate data
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(422).json({ errors: result.array() });
  }

  if (result.errors.length > 0) {
    throw new HttpError(JSON.stringify(result.errors), 422);
  }

  const data = matchedData(req);

  const password = bcrypt.hashSync(data.password, 10);

  let newMember;

  try {
    // create new member
    const createdMember = new Member({
      //spread operator
      ...data,
    });

    const session = await mongoose.startSession();
    session.startTransaction();

    // Save member and Save password in one transaction
    // Save member
    newMember = await createdMember.save({ session });
    const createdPassword = new Password({
      password,
      // Read Member-ID
      member: newMember._id,
    });

    const existingUser = await Member.findOne({
      $or: [{ username: data.username }, { email: data.email }],
    });

    if (existingUser) {
      throw new HttpError('Username or email already exists.', 422);
    }

    // Save password
    await createdPassword.save({ session });

    // Confirm transaction
    await session.commitTransaction();

    // Send the data to the client (w/o password)

    res.json(newMember);
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB duplicate key error code
      throw new HttpError('Username or email already exists.', 422);
    }
    throw new HttpError('Something went wrong!', 500);
  }
};

const login = async (req, res, next) => {
  try {
    const data = req.body;

    const foundMember = await Member.findOne({
      $or: [{ username: data.username }, { email: data.email }],
    });

    if (!foundMember) {
      throw new HttpError('Cant Find Member', 404);
    }

    const foundPassword = await Password.findOne({
      member: foundMember._id,
    });

    if (!checkHash(data.password, foundPassword.password)) {
      throw new HttpError('Cant Find Member', 404);
    }

    const token = getToken(foundMember._id);

    // JWT token to client
    res.send(token);
  } catch (error) {
    return next(new HttpError(error, error.errorCode || 422));
  }
};

export { allCalendar, whatDay, signup, login };
