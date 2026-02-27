const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  visitDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  visitType: {
    type: String,
    enum: ['Check-up', 'Follow-up', 'Emergency', 'Vaccination', 'Consultation', 'Other'],
    default: 'Check-up'
  },
  symptoms: String,
  diagnosis: String,
  treatment: String,
  prescription: [{
    medicine: String,
    dosage: String,
    duration: String,
    instructions: String
  }],
  vitalSigns: {
    bloodPressure: String,
    temperature: String,
    pulse: String,
    weight: String,
    height: String
  },
  notes: String,
  referral: {
    referred: Boolean,
    referredTo: String,
    reason: String
  },
  ashaWorker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asha'
  },
  followUpDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Visit', visitSchema);
