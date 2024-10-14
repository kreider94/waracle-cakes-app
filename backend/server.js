require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB connection successful!');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use(express.json());

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
