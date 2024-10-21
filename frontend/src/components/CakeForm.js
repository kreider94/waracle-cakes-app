import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
}));

function CakeForm() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    comment: '',
    imageUrl: '',
    yumFactor: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/cakes', formData);
      setFormData({
        name: '',
        comment: '',
        imageUrl: '',
        yumFactor: '',
      });
    } catch (err) {
      setError('Error submitting the cake');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.formContainer}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            name="name"
            label="Cake Name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            className={classes.formField}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="comment"
            label="Comment"
            value={formData.comment}
            onChange={handleChange}
            fullWidth
            className={classes.formField}
            required
            multiline
            minRows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="imageUrl"
            label="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            fullWidth
            className={classes.formField}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="yumFactor"
            label="Yum Factor"
            value={formData.yumFactor}
            onChange={handleChange}
            type="number"
            fullWidth
            className={classes.formField}
            required
            inputProps={{ min: 1, max: 5 }}
          />
        </Grid>
        <Grid item xs={12}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Button variant="contained" color="primary" type="submit">
            Submit Cake
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default CakeForm;
