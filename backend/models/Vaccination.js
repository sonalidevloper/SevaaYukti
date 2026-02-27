const mongoose = require('mongoose');

const vaccinationSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  vaccineName: {
    type: String,
    required: true
  },
  vaccineType: {
    type: String,
    enum: ['BCG', 'OPV', 'DPT', 'Hepatitis B', 'MMR', 'COVID-19', 'Typhoid', 'Other'],
    required: true
  },
  doseNumber: {
    type: Number,
    default: 1
  },
  dateAdministered: {
    type: Date,
    required: true,
    default: Date.now
  },
  nextDueDate: Date,
  batchNumber: String,
  location: String,
  administeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asha'
  },
  administeredByName: String,
  sideEffects: String,
  notes: String,
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Vaccination', vaccinationSchema);
