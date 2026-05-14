const express = require('express');
const Registration = require('../models/Registration');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, event, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required.' });
    }

    const registration = new Registration({
      name,
      email,
      phone,
      event,
      message,
    });

    await registration.save();
    return res.status(201).json({ message: 'Registration created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error while saving registration' });
  }
});

router.get('/', async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    return res.json(registrations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error fetching registrations' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Registration.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    return res.json({ message: 'Registration deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error deleting registration' });
  }
});

module.exports = router;
