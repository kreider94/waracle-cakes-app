import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles'; 
import CakeCard from './CakeCard';
import CakeDetailsPopup from './CakeDetailsPopup';
import AddCakePopup from './AddCakePopup';
import { getCakes, deleteCake, addCake } from '../api';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  cakeCardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
}));

function CakeList() {
  const classes = useStyles();
  const [cakes, setCakes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCake, setSelectedCake] = useState(null);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const cakes = await getCakes();
        setCakes(cakes);
      } catch (error) {
        setError('Failed to fetch cakes:', error);
      }
    };

    fetchCakes();
  }, []);

  const handleCakeClick = (cake) => {
    setSelectedCake(cake);
  };

  const handleAddPopupOpen = () => {
    setIsAddPopupOpen(true);
  };

  const handleAddPopupClose = () => {
    setIsAddPopupOpen(false);
  };

  const handleDeleteCake = async (cake) => {
    try {
      await deleteCake(cake._id);
      const updatedCakes = await getCakes();
      setCakes(updatedCakes);
    } catch (error) {
      setError('Failed to delete cake:', error);
    }
  };

  const handleAddCake = async (newCake) => {
    try {
      const isDuplicate = cakes.some(cake => cake.name.toLowerCase() === newCake.name.toLowerCase());
      if (isDuplicate) {
        setError('A cake with this name already exists.');
        return;
      }
      
      const addedCake = await addCake(newCake);
      console.log('Added cake:', addedCake);
      const updatedCakes = await getCakes();
      setCakes(updatedCakes);
    } catch (error) {
      setError('Failed to add cake:', error);
    }
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.cakeCardContainer}>
        {cakes.map((cake) => (
          <Box key={cake.id}>
            <CakeCard 
              cake={cake} 
              onClick={() => handleCakeClick(cake)} 
              onDeleteCake={() => handleDeleteCake(cake)} 
            />
          </Box>
        ))}
      </Box>
      <CakeDetailsPopup cake={selectedCake} onClose={() => setSelectedCake(null)} />
      <AddCakePopup open={isAddPopupOpen} onClose={handleAddPopupClose} onAddCake={handleAddCake}/>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleAddPopupOpen}
      >
        Add New Cake
      </Button>
    </Box>
  );
}

export default CakeList;
