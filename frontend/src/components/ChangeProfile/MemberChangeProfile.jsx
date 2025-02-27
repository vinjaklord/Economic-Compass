import { useState } from 'react';
import {
  Grid2 as Grid,
  Typography,
  Button,
  Box,
  TextField,
  duration,
} from '@mui/material';
import useStore from '../../hooks/useStore.js';
import useForm from '../../hooks/useForm.js';
import './MemberChangeProfile.css';
import { useNavigate } from 'react-router-dom';

const MemberChangeProfile = () => {
  const { loggedInMember, memberChangeProfile, raiseAlert, destroyAlert } =
    useStore((state) => state);

  const { formState, handleFormChange } = useForm({
    firstName: loggedInMember.firstName,
    lastName: loggedInMember.lastName,
    username: loggedInMember.username,
  });

  // const navigate = useNavigate();
  const navigate = useNavigate();

  const handleChangeProfile = () => {
    // Daten in ein formDate-Objekt umwandeln
    const submitForm = new FormData();
    Object.entries(formState).forEach(([key, value]) =>
      submitForm.append(key, value)
    );

    // Methode memberChangeProfile aufrufen
    const result = memberChangeProfile(submitForm);
    if (result) {
      // Navigate to dashboard on successful login
      navigate('/');
    } else {
      // If login fails, show an alert using CustomAlert
      raiseAlert({
        severity: 'error',
        title: 'Failed',
        text: 'Check the fields or try again later!',
      });
    }
  };

  return (
    <div className="member-change-profile-container">
      <div className="member-change-profile-form">
        <Typography
          variant="h4"
          component="h1"
          className="member-change-profile-header"
        >
          Profildaten ändern
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
