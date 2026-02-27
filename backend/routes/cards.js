const express = require('express');
const router = express.Router();
const CardApplication = require('../models/CardApplication');

// @route   POST /api/cards
// @desc    Apply for Swasthya Saathi card
// @access  Public
router.post('/', async (req, res) => {
  try {
    console.log('📝 Received application data:', req.body);
    
    // Generate unique card application number
    const count = await CardApplication.countDocuments();
    const applicationNumber = `SSC${Date.now()}${count + 1}`;
    
    const cardApplication = await CardApplication.create({
      ...req.body,
      applicationNumber
    });
    
    console.log('✅ Application saved to database:', cardApplication._id);
    
    res.status(201).json({
      success: true,
      message: 'Card application submitted successfully',
      data: cardApplication
    });
  } catch (error) {
    console.error('❌ Error saving application:', error.message);
    console.error('Error details:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// @route   GET /api/cards
// @desc    Get all card applications
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    
    const applications = await CardApplication.find(filter)
      .populate('patientId', 'name phone address')
      .populate('approvedBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// @route   GET /api/cards/:id
// @desc    Get single card application
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const application = await CardApplication.findById(req.params.id)
      .populate('patientId')
      .populate('approvedBy', 'name email');
    
    if (!application) {
      return res.status(404).json({ 
        success: false,
        message: 'Application not found' 
      });
    }
    
    res.json({
      success: true,
      data: application
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// @route   PUT /api/cards/:id/approve
// @desc    Approve card application
// @access  Private
router.put('/:id/approve', async (req, res) => {
  try {
    const { approvedBy } = req.body;
    
    // Generate card number
    const cardNumber = `SS${Date.now()}${Math.floor(Math.random() * 10000)}`;
    
    const application = await CardApplication.findByIdAndUpdate(
      req.params.id,
      {
        status: 'Approved',
        cardNumber,
        approvedBy,
        approvedAt: Date.now(),
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    if (!application) {
      return res.status(404).json({ 
        success: false,
        message: 'Application not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Application approved successfully',
      data: application
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// @route   PUT /api/cards/:id/reject
// @desc    Reject card application
// @access  Private
router.put('/:id/reject', async (req, res) => {
  try {
    const { rejectionReason } = req.body;
    
    const application = await CardApplication.findByIdAndUpdate(
      req.params.id,
      {
        status: 'Rejected',
        rejectionReason,
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    if (!application) {
      return res.status(404).json({ 
        success: false,
        message: 'Application not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Application rejected',
      data: application
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

module.exports = router;
