import { useState } from 'react';
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
import './MemberChangeProfile.css';
import { useNavigate } from 'react-router-dom';

const MemberChangeProfile = () => {
  const { loggedInMember, memberChangeProfile, raiseAlert } = useStore(
    (state) => state
  );

  const [favImpact, setFavImpact] = useState(() => {
    return Array.isArray(loggedInMember?.impact)
      ? loggedInMember.impact.join(',')
      : loggedInMember?.impact || '';
  });

  const [favCurrencies, setFavCurrencies] = useState(() => {
    return Array.isArray(loggedInMember?.favCurrencies)
      ? loggedInMember.favCurrencies.join(',')
      : loggedInMember?.favCurrencies || '';
  });

  const { formState, handleFormChange } = useForm({
    firstName: loggedInMember.firstName,
    lastName: loggedInMember.lastName,
    username: loggedInMember.username,
    timeZone: loggedInMember.timeZone || '',
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

  const handleChangeProfile = () => {
    const submitForm = new FormData();
    submitForm.append('firstName', formState.firstName);
    submitForm.append('lastName', formState.lastName);
    submitForm.append('username', formState.username);
    submitForm.append('timeZone', formState.timeZone);
    submitForm.append('favCurrencies', favCurrencies);
    submitForm.append('impact', favImpact);

    const result = memberChangeProfile(submitForm);
    if (result) {
      // Update sessionStorage
      const updatedMember = {
        ...loggedInMember,
        firstName: formState.firstName,
        lastName: formState.lastName,
        username: formState.username,
        timeZone: formState.timeZone,
        favCurrencies,
        impact: favImpact,
      };
      sessionStorage.setItem('lh_member', JSON.stringify(updatedMember));

      // Trigger the Table to refresh
      window.dispatchEvent(new Event('profileUpdated'));

      navigate('/');
    } else {
      raiseAlert({
        severity: 'error',
        title: 'Failed',
        text: 'Check the fields or try again later!',
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
    <div className="member-change-profile-container">
      <div className="member-change-profile-form">
        <Typography
          variant="h4"
          component="h1"
          className="member-change-profile-header"
        >
          Edit Profile/Preferences
        </Typography>

        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid size={4}>
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
          <Grid size={4}>
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
          <Grid size={4}>
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
            <Typography variant="h6">Preferred Currencies</Typography>
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
            <Typography variant="h6">Favorite Impact Levels</Typography>
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
          onClick={handleChangeProfile}
          className="member-change-profile-button"
        >
          Absenden
        </Button>
      </div>
    </div>
  );
};

export default MemberChangeProfile;
