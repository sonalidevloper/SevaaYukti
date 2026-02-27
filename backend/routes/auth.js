const express = require('express');
const router = express.Router();
const Asha = require('../models/Asha');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '30d',
  });
};

// Generate Unique ASHA Worker ID
const generateUniqueWorkerId = async () => {
  let workerId;
  let exists = true;
  
  while (exists) {
    // Generate random 6-digit number
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    workerId = `ASHA${randomNum}`;
    
    // Check if this ID already exists
    const existing = await Asha.findOne({ workerId });
    exists = !!existing;
  }
  
  return workerId;
};

// @route   POST /api/auth/signup
// @desc    Sign up new ASHA worker with name and phone
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    const { name, phone } = req.body;

    // Validate input
    if (!name || !phone) {
      return res.status(400).json({ message: 'Please provide name and phone number' });
    }

    // Validate phone number
    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: 'Please provide a valid 10-digit mobile number' });
    }

    // Check if phone already registered
    const phoneExists = await Asha.findOne({ phone });
    if (phoneExists) {
      return res.status(400).json({ message: 'This mobile number is already registered' });
    }

    // Generate unique worker ID
    const workerId = await generateUniqueWorkerId();

    // Create ASHA worker with minimal required fields
    const asha = await Asha.create({
      workerId,
      name,
      phone,
      area: 'Not specified', // Default value since it's required in schema
      isVerified: false
    });

    if (asha) {
      res.status(201).json({
        success: true,
        _id: asha._id,
        name: asha.name,
        workerId: asha.workerId,
        phone: asha.phone,
        message: 'Registration successful! Save your Worker ID for login.',
        token: generateToken(asha._id),
      });
    }
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/register
// @desc    Register new ASHA worker
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, area, address } = req.body;

    // Check if user exists
    const ashaExists = await Asha.findOne({ email });
    if (ashaExists) {
      return res.status(400).json({ message: 'ASHA worker already exists' });
    }

    // Create user
    const asha = await Asha.create({
      name,
      email,
      password,
      phone,
      area,
      address
    });

    if (asha) {
      res.status(201).json({
        _id: asha._id,
        name: asha.name,
        email: asha.email,
        phone: asha.phone,
        area: asha.area,
        token: generateToken(asha._id),
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Login ASHA worker with Worker ID
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { workerId } = req.body;

    // Check for user by worker ID
    const asha = await Asha.findOne({ workerId });

    if (asha) {
      res.json({
        _id: asha._id,
        name: asha.name,
        workerId: asha.workerId,
        phone: asha.phone,
        area: asha.area,
        token: generateToken(asha._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid Worker ID' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/auth/profile
// @desc    Get ASHA profile
// @access  Private
router.get('/profile', async (req, res) => {
  try {
    const asha = await Asha.findById(req.user.id).select('-password');
    res.json(asha);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
