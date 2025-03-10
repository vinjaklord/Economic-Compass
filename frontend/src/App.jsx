import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Correct imports
import { useEffect } from 'react';
import { Box } from '@mui/material';
import Header from './components/Header/Header'; // Your Header component

import Login from './components/Login/Login'; // Your Login component
import Signup from './components/Signup/Signup'; // Import Signup component
import ConfirmDialog from './components/Layouts/ConfirmDialog.jsx';
import CustomAlert from './components/Layouts/CustomAlert.jsx';
import MemberChangeProfile from './components/ChangeProfile/MemberChangeProfile.jsx';
import useStore from './hooks/useStore'; // Your custom store hook
import Dashboard from './components/Layouts/Dashboard.jsx';
import NewsPage from './components/News_Sentiment/NewsPage.jsx';
import TablePage from './components/Table/TablePage.jsx';

function App() {
  const { loggedInMember, memberCheck } = useStore((state) => state);

  // Check if the user is logged in on every page load
  useEffect(() => {
    memberCheck();
  }, [memberCheck]);

  // Define routes for logged in users
  const routerLoggedIn = (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="edit-profile" element={<MemberChangeProfile />} />
      <Route path="news" element={<NewsPage />} />
      <Route path="calendar" element={<TablePage />} />
    </Routes>
  );

  // Define routes for users who are not logged in
  const routerNotLoggedIn = (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="news" element={<NewsPage />} />
      <Route path="calendar" element={<TablePage />} />
    </Routes>
  );

  // Select the correct set of routes based on loggedInMember status
  const routes = loggedInMember ? routerLoggedIn : routerNotLoggedIn;

  return (
    <Router>
      <ConfirmDialog />
      <CustomAlert />
      <Header />
      <Box sx={{ padding: 3 }}>{routes}</Box>
    </Router>
  );
}

export default App;
