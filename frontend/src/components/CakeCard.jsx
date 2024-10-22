import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CakeDetailsPopup from './CakeDetailsPopup';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 500,
    height: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: theme.spacing(2),
    cursor: "pointer"
  },
  media: {
    height: 300,
    objectFit: "cover",
  },
}));

const CakeCard = ({ cake, onDeleteCake }) => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleDelete = async () => {
    console.log("deleting cake")
    try {
      await onDeleteCake(cake);
      handleClosePopup();
    } catch (error) {
      console.error('Error deleting cake:', error);
    }
  };

  return (
    <>
      <Card className={classes.card} onClick={handleOpenPopup}>
        <CardMedia
          className={classes.media}
          image={cake.imageUrl}
          title={cake.name}
        />
        <CardContent>
          <Typography variant="h6" component="h2">
            {cake.name}
          </Typography>
        </CardContent>
      </Card>
      <CakeDetailsPopup
        open={openPopup}
        onClose={handleClosePopup}
        onDelete={handleDelete}
        cake={cake}
      />
    </>
  );
};

export default CakeCard;
