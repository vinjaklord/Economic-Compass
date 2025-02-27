import { formatInTimeZone } from 'date-fns-tz';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { validationResult, matchedData } from 'express-validator';
import { getToken, checkHash } from './middleware.js';
import HttpError from '../models/http-error.js';
import { Password, Member } from '../models/members.js';
import { Economics, News } from '../models/news.js';
import dotenv from 'dotenv';
dotenv.config();

///////////////////////////////////////////////////////////////////////////////////////

const allCalendar = async (req, res) => {
  try {
    const data = await Economics.find(
      { impact: { $ne: 'Low' } }, // Exclude 'low' impact
      'title country date impact forecast previous -_id'
    )
      .sort({ date: 1 })
      .lean();

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

const getOneMember = async (req, res, next) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      throw new HttpError('Cant Find Member', 404);
    }

    res.json(member);
  } catch (error) {
    return next(new HttpError(error.message, error.errorCode || 422));
  }
};

const news = async (req, res, next) => {
  try {
    const data = await News.find();
    res.json(data);
  } catch (error) {
    console.error('Error fetching API data from data.json  |  ', error.message);
  }
};

//////////////////////////////////////////////////////////////////////////////////

const signup = async (req, res, next) => {
  // Validate the request body
  const result = validationResult(req);

  // If there are validation errors, return them
  if (!result.isEmpty()) {
    return res.status(422).json({
      errors: result.array(), // Send detailed errors
    });
  }

  // Extract matched data
  const data = req.body;

  // Hash the password
  const password = bcrypt.hashSync(data.password, 10);

  let newMember;

  try {
    // Create new member instance
    const createdMember = new Member({
      ...data,
    });

    const session = await mongoose.startSession();
    session.startTransaction();

    // Check for existing username or email
    const existingUser = await Member.findOne({
      $or: [{ username: data.username }, { email: data.email }],
    });

    if (existingUser) {
      return res.status(422).json({
        message: 'Username or email already exists.',
      });
    }

    // Save the member and password in a transaction
    newMember = await createdMember.save({ session });

    const createdPassword = new Password({
      password,
      member: newMember._id,
    });

    await createdPassword.save({ session });

    // Commit transaction
    await session.commitTransaction();

    // Respond with the new member (without the password)
    res.json({
      id: newMember.id,
      username: newMember.username,
      email: newMember.email,
      firstName: newMember.firstName,
      lastName: newMember.lastName,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    if (error.code === 11000) {
      return res.status(422).json({
        message: 'Username or email already exists.',
      });
    }
    return res.status(500).json({
      message: 'Something went wrong!',
    });
  }
};

const login = async (req, res, next) => {
  try {
    const data = req.body;

    const foundMember = await Member.findOne({
      $or: [{ username: data.username }, { email: data.email }],
    });

    if (!foundMember) {
      console.log(
        'Member not found with username/email: ',
        data.username,
        data.email
      );
      throw new HttpError('Cannot Find Member', 404);
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

const updateMember = async (req, res, next) => {
  try {
    // Sicherheitsprüfung: Member kann sich nur selbst wollen
    const { id } = req.params;

    // Feldprüfungen Ergebnis checken
    const result = validationResult(req);

    if (result.errors.length > 0) {
      throw new HttpError(JSON.stringify(result.errors), 422);
    }

    const data = matchedData(req);

    // gibt es den Member überhaupt? Wenn nein, Abbruch
    const foundMember = await Member.findById(id);

    if (!foundMember) {
      throw new HttpError('Member cannot be found', 404);
    }

    // Es werden nur die Felder geändert, die über die Schnittstelle kommen
    Object.assign(foundMember, data);

    // Member speichern
    const updatedMember = await foundMember.save();

    // geänderten Daten rausschicken
    res.json(updatedMember);
  } catch (error) {
    return next(new HttpError(error, error.errorCode || 500));
  }
};

////////////////////////////////////////////////////////////////////////////

export {
  allCalendar,
  whatDay,
  signup,
  login,
  news,
  getOneMember,
  updateMember,
};
