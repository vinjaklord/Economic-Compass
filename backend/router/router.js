import { Router } from 'express';
import { allCalendar, whatDay } from '../controllers/controller.js';
import { body } from 'express-validator';
import { login, signup } from '../controllers/controller.js';

const router = new Router();

router.get('/', allCalendar);
router.get('/calendar', allCalendar);

router.get('/calendar/day/:day', whatDay);

router.post(
  '/members/signup',

  body('email').escape().isEmail().toLowerCase().normalizeEmail(),
  body('password').escape().isLength({ min: 6, max: 50 }),
  body('username').trim().escape().isLength({ min: 4, max: 50 }),
  body('firstName').trim().escape(),
  body('lastName').trim().escape(),
  signup
);

router.post(
  '/members/login',
  body('username').escape().optional(),
  body('password').escape().optional(),
  login
);

export default router;
