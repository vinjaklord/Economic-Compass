import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import useStore from '../../hooks/useStore';

const CustomAlert = () => {
  const { alert, destroyDialog } = useStore((state) => state);

  if (!alert) return null; // Prevent rendering if there's no alert

  const handleClose = (event, reason) => {
    // Check if the alert was closed by the timeout or manually (X button)
    if (reason === 'timeout' || reason === 'clickaway') {
      destroyDialog(); // Clear the alert from the store
    }
  };

  return (
    <Snackbar
      open={Boolean(alert)}
      autoHideDuration={alert?.duration} // Snackbar will hide after this duration
      onClose={handleClose} // Handle the close event for both timeout and X button
    >
      <Alert
        onClose={handleClose} // Ensure the close handler is set for the X button
        severity={alert?.severity}
        variant={alert?.variant}
      >
        {alert?.title && <AlertTitle>{alert?.title}</AlertTitle>}
        {alert?.text}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
