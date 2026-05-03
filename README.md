# EconomicCompass

A full-stack forex trading dashboard that pulls economic calendar events, news sentiment, and trading calculators into one personalized view. Built on the MERN stack and deployed on Vercel.

**Live app:** [economic-compass.vercel.app](https://economic-compass.vercel.app)

## Demo credentials

| Role | Username | Password |
|---|---|---|
| Test User | `aronpozsar` | `123123` |

> Guest access shows the dashboard read-only. Logging in unlocks the User Preference Engine — save currency filters, timezone, impact level preferences, and a favourite calculator, all persisted across sessions.

---

## What it does

- **Economic Calendar** — Hourly cron job pulls weekly events from the Forex Factory API into MongoDB. The table groups events by date and country, respects the user's saved timezone via `moment-timezone`, and filters by their preferred currencies and impact levels (High / Medium / Low). Dashboard shows the next 12 events; the full page shows everything.

- **News Sentiment Feed** — Hourly cron job pulls forex news and per-currency sentiment scores from Alpha Vantage. Displays headline, summary, source, publish time, and `ticker_sentiment` scores for major currency pairs.

- **Position Size Calculator** — Given account currency, account size, risk %, and stop loss in pips, computes the correct lot size using live exchange rates from the fawazahmed0 CDN. JPY pairs get automatic 100x pip adjustment.

- **Currency Converter** — Real-time conversion across 31 currencies using the European Central Bank XML feed, parsed server-side with `xml2js`.

- **User Preference Engine** — JWT-authenticated profiles stored in MongoDB. Users can set: timezone, favourite currencies, impact level filters, and a default calculator. Changes sync between `localStorage` and the backend via `PATCH /members/:id`.

---

## Stack

### Frontend

| Layer | Library / Version |
|---|---|
| Framework | React 18.3 + Vite 6 |
| UI | Material UI (MUI) v6 + Emotion |
| Routing | React Router v7 |
| State | Zustand v5 |
| HTTP | Axios |
| Tables | react-table v7 |
| Date/Time | moment-timezone |
| Auth | jwt-decode |
| Testing | Cypress 15.9 |

### Backend

| Layer | Library / Version |
|---|---|
| Framework | Express 4.21 (ES modules) |
| Database | MongoDB Atlas + Mongoose 8.9 |
| Auth | Passport (local strategy), jsonwebtoken, bcrypt |
| Validation | express-validator |
| Security | Helmet (CSP), CORS |
| Scheduling | node-cron |
| XML parsing | xml2js |
| File uploads | Multer |

---


## API endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/calendar` | — | All economic events |
| GET | `/calendar/day/:day` | — | Events for `today` or `tomorrow` (EST) |
| GET | `/news` | — | Forex news + sentiment |
| POST | `/position-size` | — | Calculate lot size |
| POST | `/currency-converter` | — | Convert currency via ECB rates |
| POST | `/signup` | — | Register new user |
| POST | `/login` | — | Authenticate, returns JWT |
| GET | `/members/:id` | JWT | Get member profile |
| PATCH | `/members/:id` | JWT | Update member profile |
| DELETE | `/test/cleanup` | — | Delete `test_*@example.com` users (test env only) |

### Position size request/response
```json
// POST /position-size
{ "baseCurrency": "EUR", "comparedTo": "USD", "accountSize": 10000, "riskRatio": 1, "stopLoss": 20, "accountCurrency": "USD" }

// Response
{ "lotSize": 0.25 }
```

### Currency converter request/response
```json
// POST /currency-converter
{ "baseCurrency": "USD", "targetCurrency": "EUR", "amount": 1000 }

// Response
{ "convertedAmount": "921.30" }
```

---

## Data models

**Member**
```js
{ username, email, firstName, lastName,
  favCurrencies: String,  // comma-separated: "EUR,USD,GBP"
  timeZone: String,       // e.g. "America/New_York"
  impact: String,         // comma-separated: "High,Medium"
  favCalc: String,        // "posSize" | "currConvert"
  isAdmin: Boolean }
```

**Economics** (calendar events)
```js
{ title, country, date, impact, forecast, previous }
```

**News**
```js
{ title, url, time_published, summary,
  overall_sentiment_score, overall_sentiment_label,
  ticker_sentiment: [{ ticker, relevance_score, ticker_sentiment_score, ticker_sentiment_label }] }
```

## Getting started

```bash
# Backend
cd backend
npm install
npm run dev       # nodemon on PORT=3000

# Frontend (separate terminal)
cd frontend
npm install
npm run dev       # Vite on http://localhost:5173
```

The frontend's Axios base URL points to the Vercel backend by default. To develop locally, change `API_URL` in [frontend/src/utils/index.js](frontend/src/utils/index.js) to `http://localhost:3000`.

---

## Testing

Cypress e2e tests run against `http://localhost:5173` with the backend on `http://localhost:3000`.

```bash
cd frontend

npx cypress open   # interactive GUI
npx cypress run    # headless CI mode
```

Test coverage:
- **smoke_test** — page navigation and basic content rendering
- **auth** — full signup → login flow using a unique test user
- **calculator_mock** — position size form with `cy.intercept` mocking the backend response
- **profile** — preference checkbox interactions + PATCH payload verification
- **news** — news table rendering and graceful 500 error handling


## External APIs

| API | Used for | Key required |
|---|---|---|
| [faireconomy.media](https://nfs.faireconomy.media) | Economic calendar data | No |
| [Alpha Vantage](https://www.alphavantage.co) | Forex news + sentiment | Yes (free tier) |
| [fawazahmed0 exchange-api](https://github.com/fawazahmed0/exchange-api) | Live FX rates for position sizing | No |
| [ECB XML feed](https://www.ecb.europa.eu) | Live rates for currency converter | No |

---

