const express = require('express');
const router = express.Router();
const Vaccination = require('../models/Vaccination');
const Patient = require('../models/Patient');

// @route   POST /api/vaccinations
// @desc    Log new vaccination
// @access  Public
router.post('/', async (req, res) => {
  try {
    const vaccination = await Vaccination.create(req.body);
    
    // Add vaccination to patient record
    if (req.body.patientId) {
      await Patient.findByIdAndUpdate(
        req.body.patientId,
        { $push: { vaccinations: vaccination._id } }
      );
    }
    
    res.status(201).json({
      success: true,
      message: 'Vaccination logged successfully',
      data: vaccination
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// @route   GET /api/vaccinations
// @desc    Get all vaccinations
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { patientId, vaccineType } = req.query;
    const filter = {};
    
    if (patientId) filter.patientId = patientId;
    if (vaccineType) filter.vaccineType = vaccineType;
    
    const vaccinations = await Vaccination.find(filter)
      .populate('patientId', 'name age phone')
      .populate('administeredBy', 'name email')
      .sort({ dateAdministered: -1 });
    
    res.json({
      success: true,
      count: vaccinations.length,
      data: vaccinations
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// @route   GET /api/vaccinations/:id
// @desc    Get single vaccination record
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const vaccination = await Vaccination.findById(req.params.id)
      .populate('patientId')
      .populate('administeredBy', 'name email phone');
    
    if (!vaccination) {
      return res.status(404).json({ 
        success: false,
        message: 'Vaccination record not found' 
      });
    }
    
    res.json({
      success: true,
      data: vaccination
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// @route   PUT /api/vaccinations/:id
// @desc    Update vaccination record
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const vaccination = await Vaccination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!vaccination) {
      return res.status(404).json({ 
        success: false,
        message: 'Vaccination record not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Vaccination record updated successfully',
      data: vaccination
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// @route   DELETE /api/vaccinations/:id
// @desc    Delete vaccination record
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const vaccination = await Vaccination.findByIdAndDelete(req.params.id);
    
    if (!vaccination) {
      return res.status(404).json({ 
        success: false,
        message: 'Vaccination record not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Vaccination record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// @route   POST /api/vaccinations/schedule
// @desc    Get vaccination schedule for a child based on DOB
// @access  Public
router.post('/schedule', async (req, res) => {
  try {
    const { childName, dateOfBirth, parentPhone } = req.body;

    if (!childName || !dateOfBirth || !parentPhone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide child name, date of birth, and parent phone number'
      });
    }

    // Calculate child's age
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    const ageInDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));

    // Complete vaccination schedule
    const vaccineSchedule = [
      { name: 'BCG', age: 0, ageUnit: 'birth', description: 'Tuberculosis', dose: 1 },
      { name: 'OPV 0', age: 0, ageUnit: 'birth', description: 'Oral Polio Vaccine', dose: 0 },
      { name: 'Hepatitis B 0', age: 0, ageUnit: 'birth', description: 'Hepatitis B', dose: 0 },
      { name: 'OPV 1', age: 6, ageUnit: 'weeks', description: 'Oral Polio Vaccine', dose: 1 },
      { name: 'Pentavalent 1', age: 6, ageUnit: 'weeks', description: 'DPT, Hep B, Hib', dose: 1 },
      { name: 'Rotavirus 1', age: 6, ageUnit: 'weeks', description: 'Rotavirus Vaccine', dose: 1 },
      { name: 'PCV 1', age: 6, ageUnit: 'weeks', description: 'Pneumococcal Conjugate', dose: 1 },
      { name: 'OPV 2', age: 10, ageUnit: 'weeks', description: 'Oral Polio Vaccine', dose: 2 },
      { name: 'Pentavalent 2', age: 10, ageUnit: 'weeks', description: 'DPT, Hep B, Hib', dose: 2 },
      { name: 'Rotavirus 2', age: 10, ageUnit: 'weeks', description: 'Rotavirus Vaccine', dose: 2 },
      { name: 'OPV 3', age: 14, ageUnit: 'weeks', description: 'Oral Polio Vaccine', dose: 3 },
      { name: 'Pentavalent 3', age: 14, ageUnit: 'weeks', description: 'DPT, Hep B, Hib', dose: 3 },
      { name: 'Rotavirus 3', age: 14, ageUnit: 'weeks', description: 'Rotavirus Vaccine', dose: 3 },
      { name: 'PCV 2', age: 14, ageUnit: 'weeks', description: 'Pneumococcal Conjugate', dose: 2 },
      { name: 'IPV 1', age: 14, ageUnit: 'weeks', description: 'Injectable Polio Vaccine', dose: 1 },
      { name: 'Measles-Rubella 1', age: 9, ageUnit: 'months', description: 'Measles-Rubella', dose: 1 },
      { name: 'PCV Booster', age: 9, ageUnit: 'months', description: 'Pneumococcal Conjugate', dose: 3 },
      { name: 'Vitamin A 1', age: 9, ageUnit: 'months', description: 'Vitamin A', dose: 1 },
      { name: 'Vitamin A 2', age: 12, ageUnit: 'months', description: 'Vitamin A', dose: 2 },
      { name: 'DPT Booster 1', age: 16, ageUnit: 'months', description: 'DPT', dose: 4 },
      { name: 'OPV Booster', age: 16, ageUnit: 'months', description: 'Oral Polio Vaccine', dose: 4 },
      { name: 'Measles-Rubella 2', age: 16, ageUnit: 'months', description: 'Measles-Rubella', dose: 2 },
      { name: 'DPT Booster 2', age: 5, ageUnit: 'years', description: 'DPT', dose: 5 },
      { name: 'Tetanus-Diphtheria', age: 10, ageUnit: 'years', description: 'Td Vaccine', dose: 1 },
    ];

    // Calculate schedule with statuses
    const processedSchedule = vaccineSchedule.map(vaccine => {
      const vaccineDueDays = vaccine.ageUnit === 'birth' ? 0 :
                             vaccine.ageUnit === 'weeks' ? vaccine.age * 7 :
                             vaccine.ageUnit === 'months' ? vaccine.age * 30 :
                             vaccine.age * 365;
      
      const dueDate = new Date(birthDate);
      dueDate.setDate(dueDate.getDate() + vaccineDueDays);

      let status;
      const gracePeriodDays = 14;
      
      if (ageInDays < vaccineDueDays) {
        status = 'upcoming';
      } else if (ageInDays >= vaccineDueDays && ageInDays < vaccineDueDays + gracePeriodDays) {
        status = 'due';
      } else {
        status = 'missed';
      }

      return {
        ...vaccine,
        dueDate: dueDate.toISOString(),
        status,
        vaccineDueDays
      };
    });

    res.json({
      success: true,
      data: {
        childName,
        dateOfBirth,
        parentPhone,
        ageInDays,
        schedule: processedSchedule
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/vaccinations/reminder
// @desc    Enable SMS reminders for vaccination schedule
// @access  Public
router.post('/reminder', async (req, res) => {
  try {
    const { childName, parentPhone, upcomingVaccines } = req.body;

    if (!parentPhone || !upcomingVaccines || upcomingVaccines.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide phone number and upcoming vaccines'
      });
    }

    // In a real application, this would integrate with an SMS service like Twilio
    // For now, we'll simulate the reminder registration
    console.log(`📱 SMS Reminder Enabled for ${childName}`);
    console.log(`Phone: ${parentPhone}`);
    console.log(`Upcoming Vaccines: ${upcomingVaccines.length}`);

    res.json({
      success: true,
      message: `SMS reminders enabled for ${parentPhone}. You will receive notifications before each vaccination due date.`,
      data: {
        phone: parentPhone,
        vaccineCount: upcomingVaccines.length,
        nextReminder: upcomingVaccines[0]?.dueDate || null
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
