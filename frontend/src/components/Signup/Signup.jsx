import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid2 as Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Link,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import useForm from '../../hooks/useForm';
import useStore from '../../hooks/useStore';
import Logo from '../../assets/economicCompass.png';
import './Signup.css';

const Signup = () => {
  const { memberSignup, raiseAlert } = useStore((state) => state);
  const [showPassword, setShowPassword] = useState(false);
  const [favCurrencies, setFavCurrencies] = useState('');
  const [favImpact, setFavImpact] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { formState, handleFormChange } = useForm({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',
    timeZone: '',
  });

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleCurrencyChange = (event) => {
    const { value, checked } = event.target;
    setFavCurrencies((prevCurrencies) => {
      const currenciesArray = prevCurrencies ? prevCurrencies.split(',') : [];
      if (checked) {
        return [...currenciesArray, value].join(',');
      } else {
        return currenciesArray
          .filter((currency) => currency !== value)
          .join(',');
      }
    });
  };

  const handleImpactChange = (event) => {
    const { value, checked } = event.target;
    setFavImpact((prevImpact) => {
      const impactArray = prevImpact ? prevImpact.split(',') : [];
      if (checked) {
        return [...impactArray, value].join(',');
      } else {
        return impactArray.filter((impact) => impact !== value).join(',');
      }
    });
  };

  const handleSignup = async () => {
    if (formState.password !== formState.confirmPassword) {
      return raiseAlert({
        severity: 'warning',
        text: 'Passwords do not match.',
      });
    }

    setIsLoading(true);

    const userData = {
      username: formState.username,
      password: formState.password,
      confirmPassword: formState.confirmPassword,
      email: formState.email,
      firstName: formState.firstName,
      lastName: formState.lastName,
      timeZone: formState.timeZone,
      favCurrencies: favCurrencies,
      impact: favImpact,
    };

    const response = await memberSignup(userData);

    if (response) {
      navigate('/login');
    } else {
      raiseAlert({
        severity: 'error',
        text: 'There was an issue with the signup. Please check the fields.',
      });
    }

    setIsLoading(false);
  };

  const timeZones = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Australia/Sydney',
  ];

  return (
    <div className="signup-container">
      <div className="signup-background-overlay"></div>

      <div className="signup-form">
        <div className="signup-logo-container">
          <img src={Logo} alt="Economic Compass" className="signup-logo" />
          <Typography variant="h3" component="h1" className="signup-brand-name">
            Economic Compass
          </Typography>
          <Typography variant="body2" className="signup-subtitle">
            Start Your Journey to Financial Clarity
          </Typography>
        </div>

        <div className="signup-divider"></div>

        <Grid container spacing={3} className="signup-fields">
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              name="username"
              value={formState.username}
              onChange={handleFormChange}
              className="text-field"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              name="email"
              value={formState.email}
              onChange={handleFormChange}
              className="text-field"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              name="firstName"
              value={formState.firstName}
              onChange={handleFormChange}
              className="text-field"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              name="lastName"
              value={formState.lastName}
              onChange={handleFormChange}
              className="text-field"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formState.password}
              onChange={handleFormChange}
              className="text-field"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      className="visibility-icon"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formState.confirmPassword}
              onChange={handleFormChange}
              className="text-field"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      className="visibility-icon"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControl
              fullWidth
              variant="outlined"
              className="time-zone-select"
            >
              <InputLabel>Time Zone</InputLabel>
              <Select
                name="timeZone"
                value={formState.timeZone}
                onChange={handleFormChange}
                label="Time Zone"
              >
                {timeZones.map((tz) => (
                  <MenuItem key={tz} value={tz}>
                    {tz}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" className="section-header">
              Preferred Currencies
            </Typography>
            <div className="checkbox-group">
              {[
                'AUD',
                'CAD',
                'CHF',
                'CNY',
                'EUR',
                'GBP',
                'JPY',
                'NZD',
                'USD',
              ].map((currency) => (
                <FormControlLabel
                  key={currency}
                  control={
                    <Checkbox
                      value={currency}
                      checked={favCurrencies.split(',').includes(currency)}
                      onChange={handleCurrencyChange}
                      className="custom-checkbox"
                    />
                  }
                  label={currency}
                  className="checkbox-label"
                />
              ))}
            </div>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" className="section-header">
              Preferred Impact Levels
            </Typography>
            <div className="checkbox-group">
              {['Low', 'Medium', 'High', 'Holiday'].map((impact) => (
                <FormControlLabel
                  key={impact}
                  control={
                    <Checkbox
                      value={impact}
                      checked={favImpact.split(',').includes(impact)}
                      onChange={handleImpactChange}
                      className="custom-checkbox"
                    />
                  }
                  label={impact}
                  className="checkbox-label"
                />
              ))}
            </div>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          onClick={handleSignup}
          disabled={isLoading}
          className={`signup-button ${isLoading ? 'loading' : ''}`}
        >
          {isLoading ? (
            <span className="loading-spinner"></span>
          ) : (
            'Create Account'
          )}
        </Button>

        <div className="login-link">
          <Typography variant="body2" className="login-text">
            Already have an account?{' '}
            <Link href="/login" className="login-link-text">
              Log in here
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Signup;
