require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cakeRoutes = require('./routes/cakeRoutes');

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB connection successful!');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use(express.json());

app.use('/api/cakes', cakeRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
