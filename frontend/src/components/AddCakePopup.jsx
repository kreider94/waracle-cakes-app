import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    textAlign: 'center',
  },
  input: {
    padding: theme.spacing(2),
  },
}));

function AddCakePopup({ open, onClose, onAddCake }) {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [yumFactor, setYumFactor] = useState(1);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // frontend validation
    if (!name || !comment || !imageUrl) {
      setError('All fields are required.');
      return;
    }

    try {
      const newCake = { name, comment, imageUrl, yumFactor };
      onAddCake(newCake);
      onClose();
      setName('');
      setComment('');
      setImageUrl('');
      setYumFactor(1);
    } catch (err) {
      setError('Error adding cake. Please try again.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className={classes.dialogTitle}>Add New Cake</DialogTitle>
      <DialogContent>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            className={classes.input}
            label="Cake Name"
            fullWidth
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            className={classes.input}
            label="Comment"
            fullWidth
            variant="outlined"
            margin="normal"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <TextField
            className={classes.input}
            label="Image URL"
            fullWidth
            variant="outlined"
            margin="normal"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
          <TextField
            className={classes.input}
            label="Yum Factor (1-5)"
            type="number"
            fullWidth
            variant="outlined"
            margin="normal"
            value={yumFactor}
            onChange={(e) =>
              setYumFactor(Math.max(1, Math.min(5, e.target.value)))
            }
            inputProps={{ min: 1, max: 5 }}
            required
          />
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add Cake
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddCakePopup;
