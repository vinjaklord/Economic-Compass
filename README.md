# 🧭 Economic Compass

> **A Professional Full-Stack Financial Dashboard & Trading Utility**
> Built with the MERN stack to provide real-time economic data, sentiment-based news, and risk management tools for global traders.

## 🚀 Live Demo & Access

**Experience the platform live:** [Economic Compass - Live App](https://economic-compass-live.vercel.app/)

### **Recruiter / Guest Access**

To explore the platform's personalized features without creating an account, please use the following demonstration credentials:

| Role | Username | Password |
| :--- | :--- | :--- |
| **Test User** | `aronpozsar` | `123123` |

> [!IMPORTANT]
> **Login Benefits**: While the dashboard is viewable as a guest, logging in unlocks the **User Preference Engine**, allowing you to save custom filters, set your preferred timezone, and persist trading defaults across sessions.

---

## 🎯 Project Overview

Economic Compass addresses the "information overload" faced by traders by aggregating high-impact economic events and market sentiment into a personalized dashboard. It transforms raw API data into actionable insights through custom filtering and precise risk-calculation utilities.

---

## ✨ Key Features

* **Personalized Economic Calendar**: Automated hourly updates via `node-cron`. Users filter global events by currency and impact level (High/Medium/Low).
* **Sentiment News Feed**: Real-time financial news integration with automated timezone normalization using `moment-timezone`.
* **Advanced Trading Utilities**:
    * **Position Sizer**: Complex mathematical logic to determine lot sizes based on account risk and stop-loss parameters.
    * **Currency Converter**: Live conversion rates fetched directly via the European Central Bank API.
* **User Preference Engine**: Persistent settings for timezones and favorite assets, synchronized across MongoDB and LocalStorage.
* **Responsive Financial UI**: A high-density dashboard designed for rapid data consumption across all device sizes.

---

## 🏗️ Technical Architecture

### **Frontend**
* **Architecture**: Variant-based component system (Reusable components for Dashboard vs. Full-Page views).
* **State Management**: **Zustand** for global auth and alerts; **Custom Hooks** for form handling and API logic.
* **UI/UX**: Material UI (MUI) for a consistent, professional-grade financial design language.

### **Backend**
* **Engine**: Node.js & Express.js with a modular RESTful routing structure.
* **Security**: JWT-based authentication, Bcrypt password hashing, and **Helmet** for hardened CSP headers.
* **Data Integrity**: **Express-Validator** middleware ensuring strict schema validation for all user inputs.
* **Automation**: Scheduled background tasks using `node-cron` for seamless data synchronization.

---

## 🧪 Quality Assurance & Testing

The project maintains a high standard of reliability through a comprehensive **Cypress** end-to-end testing suite.

### **Test Coverage**
* **Critical User Paths**: Robust testing of the Signup/Login flow and Profile preference updates.
* **Resilience Testing**: Mocking API `500` errors using `cy.intercept` to verify graceful UI degradation and error notifications.
* **Interaction Testing**: Handling complex UI states, such as sidebar animations and dynamic form validation.
* **Database Hygiene**: Custom `before-all` hooks and backend "Cleanup" routes (test-restricted) ensure a deterministic testing state.

### **Running Tests**
```bash
# Open Cypress Test Runner
npx cypress open

# Run headless tests
npx cypress run

```

---

## 💻 Installation & Setup

1. **Clone & Install**:

```bash
git clone [https://github.com/vinjaklord/EconomicCompass.git](https://github.com/vinjaklord/EconomicCompass.git)
cd EconomicCompass
npm install

```

2. **Environment Setup**:
Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_USERNAME=your_username
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

**Aron Pozsar** [LinkedIn](https://www.google.com/search?q=https://www.linkedin.com/in/aronpozsar/) | aronpozsar@gmail.com

---

*This project was developed with a focus on **Clean Code**, **Test-Driven Development (TDD)**, and **Scalable Architecture**.*
