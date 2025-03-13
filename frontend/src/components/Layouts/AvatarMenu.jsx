import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import BackgroundLetterAvatars from './LetterAvatar.jsx';

import {
  FiberPin as PasswordIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  PauseCircle as PauseIcon,
  PlayCircleOutline as ActivateIcon,
  Delete as DeleteIcon,
  Login as LoginIcon,
  PersonAdd as SignupIcon,
} from '@mui/icons-material';

import useStore from '../../hooks/useStore.js';

const AvatarMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const { memberLogout, loggedInMember } = useStore((state) => state);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Member">
          <IconButton
            onClick={handleClick}
            size="large"
            aria-controls={open ? 'member-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <BackgroundLetterAvatars />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="member-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {!loggedInMember && (
          <>
            <MenuItem
              onClick={() => {
                navigate('/signup');
                handleClose();
              }}
            >
              <ListItemIcon>
                <SignupIcon fontSize="small" />
              </ListItemIcon>
              Sign Up
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/login');
                handleClose();
              }}
            >
              <ListItemIcon>
                <LoginIcon fontSize="small" />
              </ListItemIcon>
              Login
            </MenuItem>
          </>
        )}
        {loggedInMember && (
          <>
            <MenuItem
              onClick={() => {
                navigate('/edit-profile');
                handleClose();
              }}
            >
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Edit Profile
            </MenuItem>

            <Divider />
            <MenuItem
              onClick={() => {
                memberLogout();
                navigate('/login');
                handleClose();
              }}
            >
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
};

export default AvatarMenu;
