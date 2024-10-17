const Cake = require("../models/cakeModel");

const addInitialCakes = async () => {
  const cakes = await Cake.find();

  if (cakes.length === 0) {
    const defaultCakes = [
      {
        name: "Chocolate Cake",
        comment: "Delicious rich chocolate cake.",
        imageUrl: "https://hips.hearstapps.com/hmg-prod/images/chocolate-cake-lead-64b83bcb7d363.jpg",
        yumFactor: 5,
      },
      {
        name: "Red Velvet Cake",
        comment: "Smooth and creamy with a hint of chocolate.",
        imageUrl: "https://thesaltycooker.com/wp-content/uploads/2022/01/RedVelvetCakewithCreamCheeseFrosting-BLOG-1.jpg",
        yumFactor: 4,
      },
    ];

    await Cake.insertMany(defaultCakes);
    console.log("Default cakes added to the database.");
  }
};

module.exports = { addInitialCakes }