import { Grid2 as Grid, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../../assets/economicCompass.png';
import AvatarMenu from '../Layouts/AvatarMenu';
import './Header.css'; // Add this import if not already present

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
      className="header-container"
      sx={{
        p: 2,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* Logo Section */}
      <Grid xs={3} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Link to="/" className="header-logo">
          <img
            src={Logo}
            alt="Economic Compass Logo"
            style={{ height: '50px' }}
          />
        </Link>
      </Grid>

      {/* Navigation Links */}
      <Grid
        xs={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        {LINKS.map((link) => (
          <Typography
            key={link.to}
            variant="h6"
            component={Link}
            to={link.to}
            className="header-nav-link"
          >
            {link.label}
          </Typography>
        ))}
      </Grid>

      {/* Avatar Menu */}
      <Grid
        xs={3}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <AvatarMenu />
      </Grid>
    </Grid>
  );
};

export default Header;
