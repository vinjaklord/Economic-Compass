import { Grid2 as Grid, Typography, Box } from '@mui/material'; // Keep Grid as Grid2
import { Link } from 'react-router-dom';
import Logo from '../../assets/economicCompass.png';
import AvatarMenu from '../Layouts/AvatarMenu';

const Header = () => {
  const LINKS = [
    { label: 'Dashboard', to: '/' },
    { label: 'News', to: '/news' },
    { label: 'Calendar', to: '/calendar' },
    { label: 'Calculator', to: '/calculator' },
  ];

  return (
    <Grid
      container
      sx={{
        backgroundColor: '#161b22',
        p: 2,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between', // Distribute space between the logo, nav, and avatar menu
        alignItems: 'center',
      }}
    >
      {/* Logo Section */}
      <Grid xs={3} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Link to="/">
          <img
            style={{
              height: '50px',
              transition: 'filter 0.3s ease',
            }}
            src={Logo}
            alt="Logo"
          />
        </Link>
      </Grid>

      {/* Navigation Links */}
      <Grid
        xs={6} // Adjust this as needed
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          gap: 4,
          marginLeft: '10px',
        }}
      >
        {LINKS.map((link) => (
          <Typography
            key={link.to}
            color="white"
            variant="h6"
            component={Link}
            to={link.to}
            sx={{
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '18px',
              transition: 'color 0.2s ease, transform 0.2s ease',
              '&:hover': {
                color: '#ecf0f1',
                transform: 'scale(1.05)',
              },
            }}
          >
            {link.label}
          </Typography>
        ))}
      </Grid>

      {/* Avatar Menu - Positioned to the right */}
      <Grid
        xs={3}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end', // Push the avatar menu to the right
        }}
      >
        <AvatarMenu />
      </Grid>
    </Grid>
  );
};

export default Header;
