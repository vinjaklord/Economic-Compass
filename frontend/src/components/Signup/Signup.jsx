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
import './Signup.css';

const Signup = () => {
  const { memberSignup, raiseAlert } = useStore((state) => state);
  const [showPassword, setShowPassword] = useState(false);
  const [favCurrencies, setFavCurrencies] = useState('');
  const [favImpact, setFavImpact] = useState('');

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

    const userData = { ...formState, favCurrencies };
    // Ensure timeZone has forward slashes (though it should already)

    console.log('Sending userData:', userData); // Debug log

    const response = await memberSignup(userData);

    if (response) {
      navigate('/login');
    } else {
      raiseAlert({
        severity: 'error',
        text: 'There was an issue with the signup. Please check the fields.',
      });
    }
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
      <div className="signup-form">
        <Typography variant="h4" component="h1" className="signup-header">
          Sign Up
        </Typography>

        <Grid container spacing={2}>
          <Grid xs={12}>
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
          <Grid xs={12}>
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
          <Grid xs={12}>
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
                    <IconButton onClick={handleClickShowPassword}>
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
          <Grid xs={12}>
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
                    <IconButton onClick={handleClickShowPassword}>
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
          <Grid xs={12}>
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
          <Grid xs={12}>
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
          <Grid xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Time Zone</InputLabel>
              <Select
                name="timeZone"
                value={formState.timeZone}
                onChange={handleFormChange}
                label="Time Zone"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {timeZones.map((tz) => (
                  <MenuItem key={tz} value={tz}>
                    {tz}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={12}>
            <Typography variant="h6">Favorite Currencies</Typography>
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
                  />
                }
                label={currency}
              />
            ))}
          </Grid>

          <Grid xs={12}>
            <Typography variant="h6">Favorite Currencies</Typography>
            {['Low', 'Medium', 'High', 'Holiday'].map((impact) => (
              <FormControlLabel
                key={impact}
                control={
                  <Checkbox
                    value={impact}
                    checked={favImpact.split(',').includes(impact)}
                    onChange={handleImpactChange}
                  />
                }
                label={impact}
              />
            ))}
          </Grid>
        </Grid>

        <Button
          variant="contained"
          onClick={handleSignup}
          className="signup-button"
        >
          Sign Up
        </Button>

        <div className="login-link">
          <Link href="/login" variant="body1">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
