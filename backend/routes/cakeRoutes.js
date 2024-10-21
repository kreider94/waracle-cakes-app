const express = require('express');
const {
  getCakes,
  getCakeById,
  addCake,
  updateCake,
  deleteCake,
} = require('../controllers/cakeController');

const router = express.Router();

// GET all cakes
router.get('/', getCakes);

// GET a single cake by ID
router.get('/:id', getCakeById);

// POST a new cake
router.post('/', addCake);

// PUT update a cake by ID
router.put('/:id', updateCake);

// DELETE a cake by ID
router.delete('/:id', deleteCake);

module.exports = router;
