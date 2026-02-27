const mongoose = require('mongoose');

const cardApplicationSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  },
  applicantName: {
    type: String,
    required: true
  },
  fatherName: String,
  dateOfBirth: Date,
  gender: String,
  phone: {
    type: String,
    required: true
  },
  email: String,
  address: {
    type: String,
    required: true
  },
  village: String,
  district: String,
  state: {
    type: String,
    default: 'Odisha'
  },
  pincode: String,
  aadharNumber: String,
  rationCardNumber: String,
  incomeProof: String,
  bloodGroup: String,
  allergies: String,
  chronicConditions: String,
  familyMembersCount: Number,
  pregnantWomenCount: Number,
  childrenUnder5Count: Number,
  hasAadharPhoto: Boolean,
  hasApplicantPhoto: Boolean,
  familyMembers: [{
    name: String,
    age: Number,
    relation: String
  }],
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  cardNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  applicationNumber: {
    type: String,
    unique: true
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asha'
  },
  approvedAt: Date,
  rejectionReason: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CardApplication', cardApplicationSchema);
