import { useState, useEffect } from 'react';
import {
  Grid2 as Grid,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import useStore from '../../hooks/useStore.js';
import useForm from '../../hooks/useForm.js';
import Logo from '../../assets/economicCompass.png';
import './MemberChangeProfile.css';
import { useNavigate } from 'react-router-dom';

const MemberChangeProfile = () => {
  const { loggedInMember, memberChangeProfile, raiseAlert } = useStore(
    (state) => state,
  );

  const [favImpact, setFavImpact] = useState('');
  const [favCurrencies, setFavCurrencies] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFavImpact(
      Array.isArray(loggedInMember?.impact)
        ? loggedInMember.impact.join(',')
        : loggedInMember?.impact || '',
    );
    setFavCurrencies(
      Array.isArray(loggedInMember?.favCurrencies)
        ? loggedInMember.favCurrencies.join(',')
        : loggedInMember?.favCurrencies || '',
    );
  }, [loggedInMember]);

  const { formState, handleFormChange } = useForm({
    firstName: loggedInMember?.firstName || '',
    lastName: loggedInMember?.lastName || '',
    username: loggedInMember?.username || '',
    timeZone: loggedInMember?.timeZone || '',
  });

  const navigate = useNavigate();

  const handleCurrencyChange = (event) => {
    const { value, checked } = event.target;
    setFavCurrencies((prevCurrencies) => {
      const currenciesArray = prevCurrencies.split(',').filter(Boolean);
      if (checked) {
        if (!currenciesArray.includes(value)) {
          return [...currenciesArray, value].join(',');
        }
        return prevCurrencies;
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
      const impactArray = prevImpact.split(',').filter(Boolean);
      if (checked) {
        if (!impactArray.includes(value)) {
          return [...impactArray, value].join(',');
        }
        return prevImpact;
      } else {
        return impactArray.filter((impact) => impact !== value).join(',');
      }
    });
  };

  const handleChangeProfile = async () => {
    setIsLoading(true);

    const submitForm = new FormData();
    submitForm.append('firstName', formState.firstName);
    submitForm.append('lastName', formState.lastName);
    submitForm.append('username', formState.username);
    submitForm.append('timeZone', formState.timeZone);
    submitForm.append('favCurrencies', favCurrencies);
    submitForm.append('impact', favImpact);

    const result = await memberChangeProfile(submitForm);

    if (result) {
      const updatedMember = {
        ...loggedInMember,
        firstName: formState.firstName,
        lastName: formState.lastName,
        username: formState.username,
        timeZone: formState.timeZone,
        favCurrencies: favCurrencies.split(',').filter(Boolean),
        impact: favImpact.split(',').filter(Boolean),
      };
      localStorage.setItem('lh_member', JSON.stringify(updatedMember));
      window.dispatchEvent(new Event('profileUpdated'));
      navigate('/');
    } else {
      raiseAlert({
        severity: 'error',
        title: 'Failed',
        text: 'Check the fields or try again later!',
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
    <div className="member-change-profile-container">
      <div className="member-change-profile-background-overlay"></div>

      <div className="member-change-profile-form">
        <div className="profile-logo-container">
          <img src={Logo} alt="Economic Compass" className="profile-logo" />
          <Typography
            variant="h3"
            component="h1"
            className="profile-brand-name"
          >
            Edit Profile
          </Typography>
          <Typography variant="body2" className="profile-subtitle">
            Customize Your Experience
          </Typography>
        </div>

        <div className="profile-divider"></div>

        <Grid container spacing={3} className="profile-fields">
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

          <Grid size={12}>
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

          <Grid size={12}>
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
                <MenuItem value="">
                  <em>Select Time Zone</em>
                </MenuItem>
                {timeZones.map((tz) => (
                  <MenuItem key={tz} value={tz}>
                    {tz}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={12}>
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

          <Grid size={12}>
            <Typography variant="h6" className="section-header">
              Impact Levels
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
          onClick={handleChangeProfile}
          disabled={isLoading}
          className={`member-change-profile-button ${isLoading ? 'loading' : ''}`}
        >
          {isLoading ? (
            <span className="loading-spinner"></span>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </div>
  );
};

export default MemberChangeProfile;
