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
import './MemberChangeProfile.css';
import { useNavigate } from 'react-router-dom';

const MemberChangeProfile = () => {
  const { loggedInMember, memberChangeProfile, raiseAlert } = useStore(
    (state) => state
  );

  const [favImpact, setFavImpact] = useState('');
  const [favCurrencies, setFavCurrencies] = useState('');

  // Sync state with loggedInMember when it changes
  useEffect(() => {
    // Update favImpact and favCurrencies when the loggedInMember changes
    setFavImpact(
      Array.isArray(loggedInMember?.impact)
        ? loggedInMember.impact.join(',') // If impact is an array, join it into a string
        : loggedInMember?.impact || '' // Otherwise, use the impact value or default to empty string
    );
    setFavCurrencies(
      Array.isArray(loggedInMember?.favCurrencies)
        ? loggedInMember.favCurrencies.join(',') // If favCurrencies is an array, join it into a string
        : loggedInMember?.favCurrencies || '' // Otherwise, use the favCurrencies value or default to empty string
    );
  }, [loggedInMember]); // This hook runs whenever loggedInMember changes

  const { formState, handleFormChange } = useForm({
    firstName: loggedInMember?.firstName || '',
    lastName: loggedInMember?.lastName || '',
    username: loggedInMember?.username || '',
    timeZone: loggedInMember?.timeZone || '',
  });

  const navigate = useNavigate();

  // Handle changes in selected currencies checkboxes
  const handleCurrencyChange = (event) => {
    const { value, checked } = event.target;
    setFavCurrencies((prevCurrencies) => {
      const currenciesArray = prevCurrencies.split(',').filter(Boolean);
      if (checked) {
        if (!currenciesArray.includes(value)) {
          return [...currenciesArray, value].join(','); // Add the selected currency if not already in the list
        }
        return prevCurrencies; // If already included, return the previous value
      } else {
        return currenciesArray
          .filter((currency) => currency !== value) // Remove the unchecked currency
          .join(','); // Join the array back into a string
      }
    });
  };

  // Handle changes in selected impact checkboxes
  const handleImpactChange = (event) => {
    const { value, checked } = event.target;
    setFavImpact((prevImpact) => {
      const impactArray = prevImpact.split(',').filter(Boolean); // Convert the string into an array and remove empty strings
      if (checked) {
        if (!impactArray.includes(value)) {
          return [...impactArray, value].join(','); // Add the selected impact level if not already in the list
        }
        return prevImpact; // If already included, return the previous value
      } else {
        return impactArray.filter((impact) => impact !== value).join(','); // Remove the unchecked impact level
      }
    });
  };

  // Handle profile submission and save changes
  const handleChangeProfile = () => {
    // Create FormData to send the updated profile data
    const submitForm = new FormData();
    submitForm.append('firstName', formState.firstName);
    submitForm.append('lastName', formState.lastName);
    submitForm.append('username', formState.username);
    submitForm.append('timeZone', formState.timeZone);
    submitForm.append('favCurrencies', favCurrencies);
    submitForm.append('impact', favImpact);

    const result = memberChangeProfile(submitForm);

    if (result) {
      // If the update is successful:
      // Update localStorage with the new profile data
      const updatedMember = {
        ...loggedInMember,
        firstName: formState.firstName,
        lastName: formState.lastName,
        username: formState.username,
        timeZone: formState.timeZone,
        favCurrencies: favCurrencies.split(',').filter(Boolean), // Convert string to array
        impact: favImpact.split(',').filter(Boolean), // Convert string to array
      };
      localStorage.setItem('lh_member', JSON.stringify(updatedMember)); // Save updated member to localStorage

      // Trigger the Table to refresh by dispatching a 'profileUpdated' event
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
          Edit Profile
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* First Name Input Field */}
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

          {/* Last Name Input Field */}
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

          {/* Username Input Field */}
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

          {/* Time Zone Dropdown */}
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

          {/* Preferred Currencies Section */}
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

          {/* Impact Levels Section */}
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

        {/* Save Changes Button */}
        <Button
          variant="contained"
          onClick={handleChangeProfile}
          className="member-change-profile-button"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default MemberChangeProfile;
