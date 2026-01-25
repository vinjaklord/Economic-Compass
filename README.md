# 🧭 Economic Compass

> **A Professional Full-Stack Financial Dashboard & Trading Utility**
> Built with the MERN stack to provide real-time economic data, sentiment-based news, and risk management tools for global traders.

## 🎯 Project Overview

Economic Compass addresses the "information overload" faced by traders by aggregating high-impact economic events and market sentiment into a personalized dashboard. It transforms raw API data into actionable insights through custom filtering and precise risk-calculation utilities.

---

## ✨ Key Features

* **Personalized Economic Calendar**: Automated hourly updates via `node-cron`. Users filter events by currency and impact level (High/Medium/Low).
* **Sentiment News Feed**: Real-time financial news integration with automated timezone normalization using `moment-timezone`.
* **Advanced Trading Calculators**:
* **Position Sizer**: Complex logic to determine lot sizes based on account risk and stop-loss.
* **Currency Converter**: Live conversion rates fetched via the European Central Bank API.


* **User Preference Engine**: Persistent settings for timezones and favorite assets, synchronized across MongoDB and LocalStorage.

---

## 🏗️ Technical Architecture

### **Frontend**

* **Architecture**: Variant-based component system (Reusable components for Dashboard vs. Full-Page views).
* **State Management**: **Zustand** for global auth and alerts; **Custom Hooks** for form handling and API logic.
* **UI/UX**: Material UI (MUI) for a consistent, professional design language.

### **Backend**

* **Engine**: Node.js & Express.js with a RESTful routing structure.
* **Security**: JWT-based authentication, Bcrypt password hashing, and **Helmet** for CSP headers.
* **Data Integrity**: **Express-Validator** middleware ensuring strict schema validation for all user inputs.
* **Automation**: Scheduled tasks using `node-cron` for background data synchronization.

---

## 🧪 Quality Assurance (E2E Testing)

The project maintains a high standard of reliability through a comprehensive **Cypress** end-to-end testing suite.

### **Test Coverage**

* **Critical User Paths**: Robust testing of the Signup/Login flow and Profile preference updates.
* **Resilience Testing**: Mocking API `500` errors using `cy.intercept` to verify graceful UI degradation and error notifications.
* **Interaction Testing**: Handling complex UI states, such as sidebar animations and dynamic form validation (including fixing visibility issues related to CSS transitions).
* **Database Hygiene**: Custom `before-all` hooks and backend "Cleanup" routes (restricted to test environments) ensure a deterministic testing state.

### **Running Tests**

```bash
# Open Cypress Test Runner
npx cypress open

# Run headless tests
npx cypress run

```

---

## 🚀 Installation & Setup

**Live App**: https://economic-compass-live.vercel.app/

1. **Clone & Install**:
```bash
git clone https://github.com/vinjaklord/EconomicCompass.git
npm install

```


2. **Environment Setup**:
Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_USERNAME=your_user
MONGODB_PASSWORD=your_password
JWT_KEY=your_secret_key
NEWS_TOKEN=your_alphavantage_key

```


3. **Launch**:
```bash
# Start Backend
npm start

# Start Frontend
npm run dev

```



---

## 📧 Contact

**Aron Pozsar** [LinkedIn](https://www.linkedin.com/in/aronpozsar/) | aronpozsar@gmail.com

---

*This project was developed with a focus on **Clean Code**, **Test-Driven Development (TDD)**, and **Scalable Architecture**.*
