import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    textAlign: 'center',
  },
  cakeImage: {
    width: '100%',
    minWidth: '300px',
    height: 'auto',
    maxHeight: '300px',
    marginBottom: theme.spacing(2),
  },
  yumFactor: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
}));

function CakeDetailsPopup({ open, onClose, onDelete, cake }) {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className={classes.dialogTitle}>{cake?.name}</DialogTitle>
      <DialogContent>
        {cake?.imageUrl && (
          <img
            src={cake.imageUrl}
            alt={cake.name}
            className={classes.cakeImage}
          />
        )}
        <Typography variant="body1">
          <strong>Comment:</strong> {cake?.comment}
        </Typography>
        <Typography variant="body1">
          <strong>Yum Factor:</strong>{' '}
          <span className={classes.yumFactor}>{cake?.yumFactor}</span>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={onDelete}
          >Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CakeDetailsPopup;
