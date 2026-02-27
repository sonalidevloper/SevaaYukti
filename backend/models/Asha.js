const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ashaSchema = new mongoose.Schema({
  workerId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    minlength: 6
  },
  phone: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  address: String,
  village: {
    type: String,
    trim: true
  },
  pinCode: {
    type: String,
    trim: true
  },
  gramPanchayat: {
    type: String,
    trim: true
  },
  district: {
    type: String,
    trim: true
  },
  block: {
    type: String,
    trim: true
  },
  experience: {
    type: Number,
    default: 0
  },
  languages: {
    type: [String],
    default: ['Odia', 'Hindi']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
ashaSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
ashaSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Asha', ashaSchema);
