import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar/Sidebar'; // New Sidebar component

import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import ConfirmDialog from './components/Layouts/ConfirmDialog.jsx';
import CustomAlert from './components/Layouts/CustomAlert.jsx';
import MemberChangeProfile from './components/ChangeProfile/MemberChangeProfile.jsx';
import useStore from './hooks/useStore';
import Dashboard from './components/Layouts/Dashboard.jsx';
import News from './components/News_Sentiment/News.jsx';
import Table from './components/Table/Table.jsx';
import Footer from './components/Footer/Footer.jsx';
import CalculatorPage from './components/Calculator-Page/CalculatorPage.jsx';
import { CurrencyConverter } from './components/Calculators/CurrencyConverter/CurrencyConverter.jsx';
import { PositionSize } from './components/Calculators/PositionSize/PositionSize.jsx';

function App() {
  const { loggedInMember, memberCheck } = useStore((state) => state);

  useEffect(() => {
    memberCheck();
  }, [memberCheck]);

  const routerLoggedIn = (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="edit-profile" element={<MemberChangeProfile />} />
      <Route path="news" element={<News variant="page" />} />
      <Route path="calendar" element={<Table variant="page" />} />
      <Route path="calculator" element={<CalculatorPage />} />
      <Route
        path="calculator/position-size"
        element={<PositionSize variant="page" />}
      />
      <Route
        path="calculator/currency-converter"
        element={<CurrencyConverter variant="page" />}
      />
    </Routes>
  );

  const routerNotLoggedIn = (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="news" element={<News />} />
      <Route path="calendar" element={<Table />} />
      <Route path="calculator" element={<CalculatorPage />} />
      <Route
        path="calculator/position-size"
        element={<PositionSize variant="page" />}
      />
      <Route
        path="calculator/currency-converter"
        element={<CurrencyConverter variant="page" />}
      />
    </Routes>
  );

  const routes = loggedInMember ? routerLoggedIn : routerNotLoggedIn;

  return (
    <Router>
      <ConfirmDialog />
      <CustomAlert />
      <Sidebar />
      <Box
        sx={{
          marginLeft: '60px',
          padding: 3,
          minHeight: '100vh',
        }}
      >
        {routes}
      </Box>
      <Footer />
    </Router>
  );
}

export default App;
