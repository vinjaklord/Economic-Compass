import { Grid2 as Grid, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../../assets/economicCompass.png";

const Header = () => {
  const LINKS = [
    { label: "Homepage", to: "/" },
    { label: "News", to: "/news" },
    { label: "Calendar", to: "/calendar" },
    { label: "Calculator", to: "/calculator" },
  ];

  return (
    <Grid
      container
      sx={{
        backgroundColor: "#2c3e50", // Dark background color
        p: 2,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        display: "flex",
        justifyContent: "flex-start", // Align items to the left
        alignItems: "center",
      }}
    >
      {/* Logo Section */}
      <Grid item xs={3} sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Link to="/">
          <img
            style={{
              height: "50px", // Adjusted height
              transition: "filter 0.3s ease",
            }}
            src={Logo}
            alt="Logo"
          />
        </Link>
      </Grid>

      {/* Navigation Links */}
      <Grid item xs={9} sx={{ display: "flex", justifyContent: "flex-start", gap: 4, marginLeft: "60px" }}>
        {LINKS.map((link) => (
          <Typography
            key={link.to}
            color="white"
            variant="h6"
            component={Link}
            to={link.to}
            sx={{
              textDecoration: "none",
              fontWeight: 500 /* Adjusted font weight */,
              fontSize: "18px" /* Adjusted font size */,
              transition: "color 0.2s ease, transform 0.2s ease",
              "&:hover": {
                color: "#ecf0f1",
                transform: "scale(1.05)" /* Hover effect */,
              },
            }}
          >
            {link.label}
          </Typography>
        ))}
      </Grid>
    </Grid>
  );
};

export default Header;
