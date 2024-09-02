const express = require('express');
const router = express.Router();
const Item = require('../../models/Item');
const auth = require('../../middleware/User/Auth');

// GET /items: Fetch all items
router.get('/', auth, async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message, code: 500 });
  }
});

// POST /items: Add a new item
router.post('/', auth, async (req, res) => {
  const item = new Item({
    name: req.body.name,
    description: req.body.description
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /items/:id: Update an existing item
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description
      },
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message, code: 400 });
  }
});

// DELETE /items/:id: Delete an item
router.delete('/:id', auth, async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted', code: 200 });
  } catch (err) {
    res.status(500).json({ message: err.message, code: 500 });
  }
});

module.exports = router;