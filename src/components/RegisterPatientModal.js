import React, { useState } from 'react';
import Modal from './Modal';
import InputField from './InputField';
import Button from './Button';
import { Camera, Upload, X, Mic } from 'lucide-react';
import { patientAPI } from '../services/api';

const RegisterPatientModal = ({ isOpen, onClose, onSave }) => {
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [formData, setFormData] = useState({
    // Personal Information
    photo: null,
    fullName: '',
    age: '',
    gender: '',
    dateOfBirth: '',
    aadhar: '',
    mobile: '',
    
    // Address
    houseNumber: '',
    village: '',
    gramPanchayat: '',
    block: '',
    district: '',
    pinCode: '',
    
    // Health Information
    bloodGroup: '',
    allergies: '',
    chronicDiseases: [],
    currentMedications: '',
    
    // Family Information
    headOfFamily: '',
    totalMembers: '',
    pregnantWomen: '',
    childrenUnder5: '',
    
    // Categories
    isPregnant: false,
    isChild: false,
    isElderly: false,
    isHighRisk: false,
  });

  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);

  const districts = [
    'Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack', 
    'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghpur', 'Jajpur', 
    'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara', 'Kendujhar', 'Khordha', 
    'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada', 
    'Puri', 'Rayagada', 'Sambalpur', 'Subarnapur', 'Sundargarh'
  ];

  const chronicDiseaseOptions = ['Diabetes', 'Hypertension', 'TB', 'Asthma', 'Other'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleChronicDiseaseToggle = (disease) => {
    setFormData(prev => ({
      ...prev,
      chronicDiseases: prev.chronicDiseases.includes(disease)
        ? prev.chronicDiseases.filter(d => d !== disease)
        : [...prev.chronicDiseases, disease]
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData(prev => ({ ...prev, photo: file.name }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setFormData(prev => ({ ...prev, photo: null }));
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-IN'; // English (India) - can also support Odia
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceTranscript('Listening...');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setVoiceTranscript(transcript);
      
      // Auto-fill form based on spoken text
      parseVoiceInput(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setVoiceTranscript('Error: ' + event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const parseVoiceInput = (transcript) => {
    const text = transcript.toLowerCase();
    const updates = {};

    // Extract name (after "name is" or "name")
    const nameMatch = text.match(/(?:name\s+is\s+|name\s+)([a-zA-Z\s]+?)(?:\s+age|\s+gender|\s+mobile|\s+village|$)/i);
    if (nameMatch) {
      updates.fullName = nameMatch[1].trim().replace(/\b\w/g, l => l.toUpperCase());
    }

    // Extract age (number followed by "years" or standalone number)
    const ageMatch = text.match(/(?:age\s+is\s+|age\s+)?(\d+)(?:\s+years?)?/i);
    if (ageMatch) {
      updates.age = ageMatch[1];
    }

    // Extract gender
    if (text.includes('male') && !text.includes('female')) {
      updates.gender = 'Male';
    } else if (text.includes('female')) {
      updates.gender = 'Female';
    }

    // Extract mobile (10 digit number)
    const mobileMatch = text.match(/(?:mobile\s+|phone\s+|number\s+)?(\d{10})/);
    if (mobileMatch) {
      updates.mobile = mobileMatch[1];
    }

    // Extract village
    const villageMatch = text.match(/(?:village\s+is\s+|village\s+|from\s+)([a-zA-Z\s]+?)(?:\s+age|\s+gender|\s+mobile|\s+district|$)/i);
    if (villageMatch) {
      updates.village = villageMatch[1].trim().replace(/\b\w/g, l => l.toUpperCase());
    }

    // Extract aadhar (12 digit number)
    const aadharMatch = text.match(/(?:aadhar\s+|aadhaar\s+)?(\d{12})/);
    if (aadharMatch) {
      updates.aadhar = aadharMatch[1];
    }

    // Update form data
    setFormData(prev => ({ ...prev, ...updates }));
    
    // Show success message
    const filledFields = Object.keys(updates).join(', ');
    if (filledFields) {
      setVoiceTranscript(`Auto-filled: ${filledFields}`);
      setTimeout(() => setVoiceTranscript(''), 3000);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    else if (formData.age < 0 || formData.age > 120) newErrors.age = 'Age must be between 0 and 120';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.village.trim()) newErrors.village = 'Village is required';

    // Aadhar validation (12 digits)
    if (formData.aadhar && !/^\d{12}$/.test(formData.aadhar)) {
      newErrors.aadhar = 'Aadhar must be 12 digits';
    }

    // Mobile validation (10 digits)
    if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile must be 10 digits';
    }

    // PIN code validation (6 digits)
    if (formData.pinCode && !/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = 'PIN code must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (saveAndClose = true) => {
    if (validateForm()) {
      try {
        // Prepare data for backend
        const patientData = {
          name: formData.fullName,
          age: parseInt(formData.age),
          gender: formData.gender,
          phone: formData.mobile,
          address: `${formData.houseNumber}, ${formData.village}, ${formData.gramPanchayat}`,
          village: formData.village,
          district: formData.district,
          aadharNumber: formData.aadhar,
          bloodGroup: formData.bloodGroup,
          emergencyContact: formData.mobile,
        };

        // Call backend API
        const response = await patientAPI.create(patientData);
        
        // Pass the saved patient data to parent component
        onSave(response.data);

        if (saveAndClose) {
          onClose();
        } else {
          // Reset form for "Save & Add Another"
          setFormData({
            photo: null,
            fullName: '',
            age: '',
            gender: '',
            dateOfBirth: '',
            aadhar: '',
            mobile: '',
          houseNumber: '',
          village: '',
          gramPanchayat: '',
          block: '',
          district: '',
          pinCode: '',
          bloodGroup: '',
          allergies: '',
          chronicDiseases: [],
          currentMedications: '',
          headOfFamily: '',
          totalMembers: '',
          pregnantWomen: '',
          childrenUnder5: '',
          isPregnant: false,
          isChild: false,
          isElderly: false,
          isHighRisk: false,
        });
        setPhotoPreview(null);
        setErrors({});
      }
    } catch (error) {
      console.error('Error registering patient:', error);
      alert('Failed to register patient. Please try again.');
    }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register New Patient" size="xl">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        {/* Voice Input Section */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Mic className={`w-5 h-5 ${isListening ? 'text-error animate-pulse' : 'text-primary'}`} />
              <h4 className="font-semibold text-textDark">Voice-Based Entry</h4>
            </div>
            <button
              type="button"
              onClick={handleVoiceInput}
              disabled={isListening}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                isListening 
                  ? 'bg-error text-white cursor-not-allowed' 
                  : 'bg-primary text-white hover:bg-primary-dark'
              }`}
            >
              {isListening ? '🎙️ Listening...' : '🎤 Speak Details'}
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Say: "Name is [name], age [number], gender [male/female], mobile [10 digits], village [village name]"
          </p>
          {voiceTranscript && (
            <div className="mt-2 p-2 bg-white rounded border border-primary/20">
              <p className="text-sm text-primary font-medium">{voiceTranscript}</p>
            </div>
          )}
        </div>

        {/* Photo Upload */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-gray-300">
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <Camera size={40} className="text-gray-400" />
              )}
            </div>
            {photoPreview && (
              <button
                type="button"
                onClick={removePhoto}
                className="absolute top-0 right-0 bg-error text-white p-1 rounded-full hover:bg-error/80"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <Button variant="outline" icon={Upload}>
              {photoPreview ? 'Change Photo' : 'Upload Photo'}
            </Button>
          </label>
        </div>

        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-bold text-textDark mb-4 border-b pb-2">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <InputField
                label="Full Name *"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                placeholder="Enter full name"
              />
            </div>

            <div>
              <InputField
                label="Age *"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                error={errors.age}
                placeholder="Enter age"
                min="0"
                max="120"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-primary ${
                  errors.gender ? 'border-error' : 'border-gray-300'
                }`}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="text-error text-sm mt-1">{errors.gender}</p>}
            </div>

            <div>
              <InputField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            <div>
              <InputField
                label="Aadhar Number"
                name="aadhar"
                value={formData.aadhar}
                onChange={handleChange}
                error={errors.aadhar}
                placeholder="12 digit Aadhar"
                maxLength="12"
              />
            </div>

            <div>
              <InputField
                label="Mobile Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                error={errors.mobile}
                placeholder="10 digit mobile"
                maxLength="10"
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div>
          <h3 className="text-lg font-bold text-textDark mb-4 border-b pb-2">Address Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <InputField
                label="House Number"
                name="houseNumber"
                value={formData.houseNumber}
                onChange={handleChange}
                placeholder="Enter house number"
              />
            </div>

            <div>
              <InputField
                label="Village/Area *"
                name="village"
                value={formData.village}
                onChange={handleChange}
                error={errors.village}
                placeholder="Enter village"
              />
            </div>

            <div>
              <InputField
                label="Gram Panchayat"
                name="gramPanchayat"
                value={formData.gramPanchayat}
                onChange={handleChange}
                placeholder="Enter gram panchayat"
              />
            </div>

            <div>
              <InputField
                label="Block"
                name="block"
                value={formData.block}
                onChange={handleChange}
                placeholder="Enter block"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="">Select district</option>
                {districts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>

            <div>
              <InputField
                label="PIN Code"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                error={errors.pinCode}
                placeholder="6 digit PIN"
                maxLength="6"
              />
            </div>
          </div>
        </div>

        {/* Health Information */}
        <div>
          <h3 className="text-lg font-bold text-textDark mb-4 border-b pb-2">Health Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="">Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Known Allergies</label>
              <textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                placeholder="Enter any known allergies"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Chronic Diseases</label>
              <div className="flex flex-wrap gap-3">
                {chronicDiseaseOptions.map(disease => (
                  <label key={disease} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.chronicDiseases.includes(disease)}
                      onChange={() => handleChronicDiseaseToggle(disease)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-sm">{disease}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
              <textarea
                name="currentMedications"
                value={formData.currentMedications}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                placeholder="List current medications"
              />
            </div>
          </div>
        </div>

        {/* Family Information */}
        <div>
          <h3 className="text-lg font-bold text-textDark mb-4 border-b pb-2">Family Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <InputField
                label="Head of Family"
                name="headOfFamily"
                value={formData.headOfFamily}
                onChange={handleChange}
                placeholder="Enter head of family"
              />
            </div>

            <div>
              <InputField
                label="Total Family Members"
                name="totalMembers"
                type="number"
                value={formData.totalMembers}
                onChange={handleChange}
                placeholder="Enter total members"
                min="1"
              />
            </div>

            <div>
              <InputField
                label="Pregnant Women in Family"
                name="pregnantWomen"
                type="number"
                value={formData.pregnantWomen}
                onChange={handleChange}
                placeholder="Enter count"
                min="0"
              />
            </div>

            <div>
              <InputField
                label="Children Under 5"
                name="childrenUnder5"
                type="number"
                value={formData.childrenUnder5}
                onChange={handleChange}
                placeholder="Enter count"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Category Tags */}
        <div>
          <h3 className="text-lg font-bold text-textDark mb-4 border-b pb-2">Category Tags</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isPregnant"
                checked={formData.isPregnant}
                onChange={handleChange}
                className="w-4 h-4 text-primary"
              />
              <span className="text-sm">Pregnant Woman</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isChild"
                checked={formData.isChild}
                onChange={handleChange}
                className="w-4 h-4 text-primary"
              />
              <span className="text-sm">Child (0-5 years)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isElderly"
                checked={formData.isElderly}
                onChange={handleChange}
                className="w-4 h-4 text-primary"
              />
              <span className="text-sm">Elderly (60+)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isHighRisk"
                checked={formData.isHighRisk}
                onChange={handleChange}
                className="w-4 h-4 text-primary"
              />
              <span className="text-sm">High-Risk Case</span>
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col md:flex-row gap-3 pt-4 border-t">
          <Button
            variant="primary"
            onClick={() => handleSubmit(true)}
            className="flex-1"
          >
            Save & Close
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSubmit(false)}
            className="flex-1"
          >
            Save & Add Another
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default RegisterPatientModal;
