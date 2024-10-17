const express = require("express");
const { Cake } = require("../models/cakeModel");

const router = express.Router();

// Get all cakes
router.get("/", async (req, res) => {
  try {
    const cakes = await Cake.find();
    res.json(cakes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single cake by ID
router.get("/:id", async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id);
    if (!cake) {
      return res.status(404).json({ message: "Cake not found" });
    }
    res.json(cake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new cake
router.post("/", async (req, res) => {
  const { name, comment, imageUrl, yumFactor } = req.body;

  const cake = new Cake({
    name,
    comment,
    imageUrl,
    yumFactor,
  });

  try {
    const savedCake = await cake.save();
    res.status(201).json(savedCake);
  } catch (error) {
    if (error.name === "MongoError" && error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Cake with this name already exists." });
    }
    res.status(400).json({ message: error.message });
  }
});

// Update a cake
router.put("/:id", async (req, res) => {
  try {
    const updatedCake = await Cake.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedCake) {
      return res.status(404).json({ message: "Cake not found" });
    }
    res.json(updatedCake);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a cake
router.delete("/:id", async (req, res) => {
  try {
    const deletedCake = await Cake.findByIdAndDelete(req.params.id);
    if (!deletedCake) {
      return res.status(404).json({ message: "Cake not found" });
    }
    res.json({ message: "Cake deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
