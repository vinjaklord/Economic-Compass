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
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import useForm from '../../hooks/useForm';
import useStore from '../../hooks/useStore'; // Your store hook
import './Signup.css';

const Signup = () => {
  const { memberSignup, raiseAlert } = useStore((state) => state);
  const [showPassword, setShowPassword] = useState(false);

  const { formState, handleFormChange } = useForm({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',
  });

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSignup = async () => {
    if (formState.password !== formState.confirmPassword) {
      return raiseAlert({
        severity: 'warning',
        text: 'Passwords do not match.',
      });
    }

    const response = await memberSignup(formState); // Send form data directly

    if (response) {
      navigate('/login');
    } else {
      // Handle the case where the signup fails
      raiseAlert({
        severity: 'error',
        text: 'There was an issue with the signup. Please check the fields.',
      });
    }
  };

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
