import { useState } from 'react';

import {
  Typography,
  Button,
  TextField,
  Stack,
  InputAdornment,
  IconButton,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';

import { useNavigate } from 'react-router-dom'; // Correct import for react-router

import useStore from '../../hooks/useStore.js';
import useForm from '../../hooks/useForm.js';
import './Login.css'; // Import the CSS

// functional component
const Login = () => {
  // Javascript-Teil
  const { memberLogin, raiseAlert } = useStore((state) => state);

  const [showPassword, setShowPassword] = useState(false);

  const { formState, handleFormChange } = useForm({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    // Attempt login
    const result = await memberLogin(formState);

    if (result) {
      // Navigate to dashboard on successful login
      navigate('/');
    } else {
      // If login fails, show an alert using CustomAlert
      raiseAlert({
        severity: 'error',
        title: 'Login Failed',
        text: 'Incorrect username or password. Please try again.',
      });
    }
  };

  // JSX-Teil
  return (
    <div className="login-container">
      <div className="login-form">
        <Typography variant="h4" component="h1" className="login-header">
          Login
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="Username"
            variant="outlined"
            name="username"
            value={formState.username}
            onChange={handleFormChange}
            className="text-field"
          />
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formState.password}
            onChange={handleFormChange}
            className="text-field"
            InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Show or Hide password"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            onClick={handleLogin}
            className="login-button"
          >
            Login
          </Button>

          <div className="register-link">
            <Link component={RouterLink} to="/signup">
              <Typography variant="body1">
                No account? Register here!
              </Typography>
            </Link>
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default Login;
