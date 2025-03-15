/* eslint-disable react/prop-types */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom'; // Import Link for redirection

export default function ActionAreaCard({
  image,
  title,
  description,
  link,
  isFavorited,
  onFavoriteToggle,
}) {
  return (
    <Card
      sx={{
        width: 400,
        backgroundColor: '#24292F',
        color: '#E1E4E8',
        textAlign: 'center',
      }}
    >
      <CardActionArea component={Link} to={link}>
        {/* Link component for redirection */}
        <CardMedia component="img" height="140" image={image} alt={title} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ color: '#E1E4E8' }}
          >
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: '#B1B6B8' }}>
            {description}
          </Typography>
          <IconButton
            aria-label="add to favorites"
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation on icon click
              onFavoriteToggle(); // Toggle the favorite state
            }}
            sx={{
              color: isFavorited ? '#ff4081' : '#B1B6B8', // Change color if favorited
            }}
          >
            <FavoriteIcon />
          </IconButton>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
