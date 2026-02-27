const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'male', 'female', 'other'],
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  village: String,
  district: String,
  aadharNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  bloodGroup: String,
  emergencyContact: String,
  ashaWorker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asha'
  },
  medicalHistory: [{
    condition: String,
    diagnosis: String,
    date: Date,
    notes: String
  }],
  visits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visit'
  }],
  vaccinations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vaccination'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Patient', patientSchema);
