require('dotenv').config();
const connectDB = require('./utils/db');
const express = require('express');
const app = express();
const cakeRoutes = require('./routes/cakeRoutes');

const uri = process.env.MONGO_URI;

connectDB();

app.use(express.json());

app.use('/api/cakes', cakeRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
