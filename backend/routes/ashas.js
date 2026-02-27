const express = require('express');
const router = express.Router();
const Asha = require('../models/Asha');

// @route   GET /api/ashas/locations/districts
// @desc    Get all unique districts
// @access  Public
router.get('/locations/districts', async (req, res) => {
  try {
    const districts = await Asha.distinct('district');
    res.json({
      success: true,
      data: districts.filter(d => d).sort()
    });
  } catch (error) {
    console.error('Get districts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching districts',
      error: error.message
    });
  }
});

// @route   GET /api/ashas/locations/blocks
// @desc    Get blocks by district
// @access  Public
router.get('/locations/blocks', async (req, res) => {
  try {
    const { district } = req.query;
    const query = district ? { district } : {};
    const blocks = await Asha.distinct('block', query);
    res.json({
      success: true,
      data: blocks.filter(b => b).sort()
    });
  } catch (error) {
    console.error('Get blocks error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blocks',
      error: error.message
    });
  }
});

// @route   GET /api/ashas/locations/panchayats
// @desc    Get gram panchayats by district and block
// @access  Public
router.get('/locations/panchayats', async (req, res) => {
  try {
    const { district, block } = req.query;
    const query = {};
    if (district) query.district = district;
    if (block) query.block = block;
    const panchayats = await Asha.distinct('gramPanchayat', query);
    res.json({
      success: true,
      data: panchayats.filter(p => p).sort()
    });
  } catch (error) {
    console.error('Get panchayats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching gram panchayats',
      error: error.message
    });
  }
});

// @route   GET /api/ashas/locations/villages
// @desc    Get villages by district, block, and gram panchayat
// @access  Public
router.get('/locations/villages', async (req, res) => {
  try {
    const { district, block, panchayat } = req.query;
    const query = {};
    if (district) query.district = district;
    if (block) query.block = block;
    if (panchayat) query.gramPanchayat = panchayat;
    const villages = await Asha.distinct('village', query);
    res.json({
      success: true,
      data: villages.filter(v => v).sort()
    });
  } catch (error) {
    console.error('Get villages error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching villages',
      error: error.message
    });
  }
});

// @route   GET /api/ashas/search
// @desc    Search ASHA workers by location hierarchy
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { district, block, panchayat, village, pincode } = req.query;

    let query = {};

    // Build hierarchical query
    if (district) query.district = district;
    if (block) query.block = block;
    if (panchayat) query.gramPanchayat = panchayat;
    if (village) query.village = village;
    if (pincode) query.pinCode = pincode;

    // Find matching ASHA workers (exclude password)
    const ashas = await Asha.find(query).select('-password').sort({ name: 1 });

    res.json({
      success: true,
      count: ashas.length,
      data: ashas
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching ASHA workers',
      error: error.message
    });
  }
});

// @route   GET /api/ashas
// @desc    Get all ASHA workers
// @access  Public
router.get('/', async (req, res) => {
  try {
    const ashas = await Asha.find().select('-password');
    res.json({
      success: true,
      count: ashas.length,
      data: ashas
    });
  } catch (error) {
    console.error('Get ASHAs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching ASHA workers',
      error: error.message
    });
  }
});

// @route   GET /api/ashas/:id
// @desc    Get single ASHA worker by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const asha = await Asha.findById(req.params.id).select('-password');
    
    if (!asha) {
      return res.status(404).json({
        success: false,
        message: 'ASHA worker not found'
      });
    }

    res.json({
      success: true,
      data: asha
    });
  } catch (error) {
    console.error('Get ASHA error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching ASHA worker',
      error: error.message
    });
  }
});

module.exports = router;
