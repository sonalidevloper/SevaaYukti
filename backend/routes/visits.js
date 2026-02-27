const express = require('express');
const router = express.Router();
const Visit = require('../models/Visit');
const Patient = require('../models/Patient');

// @route   POST /api/visits
// @desc    Record new visit
// @access  Public
router.post('/', async (req, res) => {
  try {
    const visit = await Visit.create(req.body);
    
    // Add visit to patient record
    if (req.body.patientId) {
      await Patient.findByIdAndUpdate(
        req.body.patientId,
        { $push: { visits: visit._id } }
      );
    }
    
    res.status(201).json({
      success: true,
      message: 'Visit recorded successfully',
      data: visit
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// @route   GET /api/visits
// @desc    Get all visits
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { patientId, visitType } = req.query;
    const filter = {};
    
    if (patientId) filter.patientId = patientId;
    if (visitType) filter.visitType = visitType;
    
    const visits = await Visit.find(filter)
      .populate('patientId', 'name age phone address')
      .populate('ashaWorker', 'name email')
      .sort({ visitDate: -1 });
    
    res.json({
      success: true,
      count: visits.length,
      data: visits
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// @route   GET /api/visits/:id
// @desc    Get single visit
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id)
      .populate('patientId')
      .populate('ashaWorker', 'name email phone');
    
    if (!visit) {
      return res.status(404).json({ 
        success: false,
        message: 'Visit not found' 
      });
    }
    
    res.json({
      success: true,
      data: visit
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// @route   PUT /api/visits/:id
// @desc    Update visit
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const visit = await Visit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!visit) {
      return res.status(404).json({ 
        success: false,
        message: 'Visit not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Visit updated successfully',
      data: visit
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// @route   DELETE /api/visits/:id
// @desc    Delete visit
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const visit = await Visit.findByIdAndDelete(req.params.id);
    
    if (!visit) {
      return res.status(404).json({ 
        success: false,
        message: 'Visit not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Visit deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

module.exports = router;
