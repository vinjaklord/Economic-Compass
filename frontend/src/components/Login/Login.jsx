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
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/useStore.js';
import useForm from '../../hooks/useForm.js';
import Logo from '../../assets/economicCompass.png';
import './Login.css';

const Login = () => {
  const { memberLogin, raiseAlert } = useStore((state) => state);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { formState, handleFormChange } = useForm({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    setIsLoading(true);
    const result = await memberLogin(formState);

    if (result) {
      navigate('/');
    } else {
      raiseAlert({
        severity: 'error',
        title: 'Login Failed',
        text: 'Incorrect username or password. Please try again.',
      });
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-background-overlay"></div>

      <div className="login-form">
        <div className="login-logo-container">
          <img src={Logo} alt="Economic Compass" className="login-logo" />
          <Typography variant="h3" component="h1" className="login-brand-name">
            Economic Compass
          </Typography>
          <Typography variant="body2" className="login-subtitle">
            Navigate Your Financial Future
          </Typography>
        </div>

        <div className="login-divider"></div>

        <Stack spacing={3} className="login-fields">
          <TextField
            label="Username"
            variant="outlined"
            name="username"
            value={formState.username}
            onChange={handleFormChange}
            onKeyPress={handleKeyPress}
            className="text-field"
            autoComplete="username"
          />
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formState.password}
            onChange={handleFormChange}
            onKeyPress={handleKeyPress}
            className="text-field"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Show or Hide password"
                    onClick={handleClickShowPassword}
                    className="visibility-icon"
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
            disabled={isLoading}
            className={`login-button ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? <span className="loading-spinner"></span> : 'Login'}
          </Button>

          <div className="register-link">
            <Typography variant="body2" className="register-text">
              Don&apos;t have an account?
              <Link
                component={RouterLink}
                to="/signup"
                className="register-link-text"
              >
                Sign up here
              </Link>
            </Typography>
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default Login;
