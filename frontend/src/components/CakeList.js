import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
}));

function CakeList() {
  const classes = useStyles();
  const [cakes, setCakes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/cakes');
        setCakes(response.data);
      } catch (err) {
        setError('Error fetching cakes');
      }
    };

    fetchCakes();
  }, []);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Grid container spacing={3}>
      {cakes.map((cake) => (
        <Grid item xs={12} sm={6} md={4} key={cake.id}>
          <Paper className={classes.paper}>
            <img src={cake.imageUrl} alt={cake.name} className={classes.image} />
            <Typography variant="h6">{cake.name}</Typography>
            <Typography>{cake.comment}</Typography>
            <Typography>Yum Factor: {cake.yumFactor}/5</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default CakeList;
