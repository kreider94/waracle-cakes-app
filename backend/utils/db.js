const mongoose = require('mongoose');
const Cake = require('../models/cakeModel');
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    await clearCakes();

    await insertDefaultCakes();
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

const clearCakes = async () => {
  try {
    await Cake.deleteMany(); // Deletes all cakes
    console.log('Cakes collection cleared');
  } catch (error) {
    console.error('Error clearing cakes collection:', error);
  }
};

const insertDefaultCakes = async () => {
  const defaultCakes = [
    {
      name: 'Chocolate Cake',
      comment: 'Rich and moist chocolate cake.',
      imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/chocolate-cake-lead-64b83bcb7d363.jpg',
      yumFactor: 3,
    },
    {
      name: 'New York Cheesecake',
      comment: 'Classic vanilla flavor.',
      imageUrl: 'https://thescranline.com/wp-content/uploads/2023/05/NEW-YORK-STYLE-CHEESECAKE-WEB-04.jpg',
      yumFactor: 5,
    },
    {
      name: 'Red Velvet Cake',
      comment: 'Soft and velvety with cream cheese frosting.',
      imageUrl: 'https://www.recipetineats.com/tachyon/2016/06/Red-Velvet-Cake-with-Cream-Cheese-Frosting_landscape.jpg',
      yumFactor: 4,
    },
  ];

  try {
    await Cake.insertMany(defaultCakes);
    console.log('Default cakes inserted');
  } catch (error) {
    console.error('Error inserting default cakes:', error);
  }
};

module.exports = connectDB;
