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
import { positionSize, currencyConverter } from '../controllers/calculator.js';

const router = new Router();

router.get('/members/:id', getOneMember);
router.patch(
  '/members/:id',
  body('firstName').trim().escape().optional(),
  body('lastName').trim().escape().optional(),
  body('username').trim().escape().isLength({ min: 4, max: 50 }).optional(),
  body('favCurrencies').trim().escape().optional(),
  body('timeZone').trim().escape().optional(),
  body('impact').trim().escape().optional(),
  body('favCalc').trim().escape().optional(),
  updateMember,
);

router.get('/', allCalendar);
router.get('/calendar', allCalendar);

router.get('/calendar/day/:day', whatDay);

router.get('/news', news);

router.post('/position-size', positionSize);
router.post('/currency-converter', currencyConverter);
router.p;

router.post(
  '/signup',
  body('email').escape().isEmail().toLowerCase().normalizeEmail(),
  body('password').escape().isLength({ min: 6, max: 50 }),
  body('confirmPassword').escape().isLength({ min: 6, max: 50 }),
  body('username').trim().escape().isLength({ min: 4, max: 50 }),
  body('firstName').trim().escape(),
  body('lastName').trim().escape(),
  body('favCurrencies').trim().escape().optional(),
  body('timeZone').trim().escape().optional(),
  body('impact').trim().escape().optional(),
  signup,
);

router.post(
  '/login',
  body('username').escape().optional(),
  body('password').escape().optional(),
  login,
);

export default router;
