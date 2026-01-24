import { useState } from 'react';

import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import BackgroundLetterAvatars from './LetterAvatar.jsx';

const AvatarMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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
    </>
  );
};

export default AvatarMenu;
