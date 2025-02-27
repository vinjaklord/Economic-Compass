import { Router } from 'express';
import { body } from 'express-validator';
import {
  allCalendar,
  whatDay,
  login,
  signup,
  news,
  getOneMember,
  updateMember,
} from '../controllers/controller.js';
import { positionSize } from '../controllers/calculator.js';

const router = new Router();

router.get('/', allCalendar);
router.get('/calendar', allCalendar);

router.get('/calendar/day/:day', whatDay);

router.get('/news', news);

router.post('/calculator', positionSize);

router.get('/member/:id', getOneMember);

router.post(
  '/signup',

  body('email').escape().isEmail().toLowerCase().normalizeEmail(),
  body('password').escape().isLength({ min: 6, max: 50 }),
  body('confirmPassword').escape().isLength({ min: 6, max: 50 }),
  body('username').trim().escape().isLength({ min: 4, max: 50 }),
  body('firstName').trim().escape(),
  body('lastName').trim().escape(),
  signup
);

router.post(
  '/login',
  body('username').escape().optional(),
  body('password').escape().optional(),
  login
);

router.patch(
  '/members/:id',

  body('firstName').trim().escape(),
  body('lastName').trim().escape(),
  body('username').trim().escape().isLength({ min: 4, max: 50 }),

  updateMember
);
router.get(
  '/members/:id',

  getOneMember
);

export default router;
