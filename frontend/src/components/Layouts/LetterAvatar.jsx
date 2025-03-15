import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Person from '@mui/icons-material/Person';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function BackgroundLetterAvatars() {
  const lhMember = JSON.parse(localStorage.getItem('lh_member'));

  // If the user is logged in, use their first and last name, otherwise show a default avatar
  if (lhMember && lhMember.firstName && lhMember.lastName) {
    const firstName = lhMember.firstName;
    const lastName = lhMember.lastName;
    return (
      <Stack direction="row" spacing={2}>
        <Avatar {...stringAvatar(`${firstName} ${lastName}`)} />
      </Stack>
    );
  } else {
    // Show a default avatar when the user is not logged in
    return (
      <Stack direction="row" spacing={2}>
        <Avatar>
          <Person />
        </Avatar>
      </Stack>
    );
  }
}
