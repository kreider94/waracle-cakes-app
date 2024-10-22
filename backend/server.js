const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const cakeRoutes = require('./routes/cakeRoutes');
const connectDB = require('./utils/db');

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({ origin: 'http://localhost:3000' }));

connectDB();

app.use('/api/cakes', cakeRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
