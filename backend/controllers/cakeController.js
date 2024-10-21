const Cake = require("../models/cakeModel");

// Get all cakes
exports.getCakes = async (req, res) => {
  try {
    const cakes = await Cake.find();
    res.status(200).json(cakes);
  } catch (error) {
    console.error("Error fetching cakes:", error.message);
    res
      .status(500)
      .json({ message: "Server error. Could not retrieve cakes." });
  }
};

// Get a single cake by ID
exports.getCakeById = async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id);
    if (!cake) {
      return res.status(404).json({ message: "Cake not found." });
    }
    res.status(200).json(cake);
  } catch (error) {
    console.error("Error fetching cake:", error.message);
    res.status(500).json({ message: "Server error. Could not retrieve cake." });
  }
};

// Add a new cake
exports.addCake = async (req, res) => {
  const { name, comment, imageUrl, yumFactor } = req.body;

  // Basic validation - fix later
  if (!name || !comment || !imageUrl || !yumFactor) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Ensure yumFactor is between 1 and 5
  if (yumFactor < 1 || yumFactor > 5) {
    return res
      .status(400)
      .json({ message: "Yum factor must be between 1 and 5." });
  }

  const existingCake = await Cake.findOne({ name });
  if (existingCake) {
    return res
      .status(400)
      .json({ message: "Cake with this name already exists." });
  }

  try {
    const newCake = new Cake({ name, comment, imageUrl, yumFactor });
    await newCake.save();
    res.status(201).json(newCake);
  } catch (error) {
    console.error("Error adding cake:", error.message);
    res.status(500).json({ message: "Server error. Could not add cake." });
  }
};

// Update a cake by ID
exports.updateCake = async (req, res) => {
  const { name, comment, imageUrl, yumFactor } = req.body;

  try {
    const cake = await Cake.findById(req.params.id);

    if (!cake) {
      return res.status(404).json({ message: "Cake not found." });
    }

    // Update cake fields
    cake.name = name || cake.name;
    cake.comment = comment || cake.comment;
    cake.imageUrl = imageUrl || cake.imageUrl;
    cake.yumFactor = yumFactor || cake.yumFactor;

    await cake.save();
    res.status(200).json(cake); // Return updated cake
  } catch (error) {
    console.error("Error updating cake:", error.message);
    res.status(500).json({ message: "Server error. Could not update cake." });
  }
};

// Delete a cake by ID
exports.deleteCake = async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id);

    if (!cake) {
      return res.status(404).json({ message: "Cake not found." });
    }

    await cake.remove();
    res.status(200).json({ message: "Cake successfully deleted." });
  } catch (error) {
    console.error("Error deleting cake:", error.message);
    res.status(500).json({ message: "Server error. Could not delete cake." });
  }
};
