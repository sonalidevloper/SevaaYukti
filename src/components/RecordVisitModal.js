import React, { useState } from 'react';
import Modal from './Modal';
import InputField from './InputField';
import Button from './Button';
import { Search, MapPin, Camera } from 'lucide-react';
import { visitAPI } from '../services/api';

const RecordVisitModal = ({ isOpen, onClose, onSave, patients }) => {
  const [step, setStep] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    visitDate: new Date().toISOString().split('T')[0],
    visitTime: new Date().toTimeString().slice(0, 5),
    visitType: '',
    location: '',
    gpsLat: (20.2961 + (Math.random() - 0.5) * 0.1).toFixed(6),
    gpsLon: (85.8245 + (Math.random() - 0.5) * 0.1).toFixed(6),
    chiefComplaints: '',
    temperature: '',
    bpSystolic: '',
    bpDiastolic: '',
    pulse: '',
    weight: '',
    height: '',
    condition: '',
    servicesProvided: [],
    detailedNotes: '',
    nextVisitDate: '',
    setReminder: false,
  });

  const visitTypes = ['Routine', 'Follow-up', 'Emergency', 'ANC', 'PNC', 'Vaccination'];
  const conditionOptions = ['Good', 'Fair', 'Poor', 'Critical'];
  const serviceOptions = [
    'Health counseling',
    'Medicine distributed',
    'Referral given',
    'Vaccination administered',
    'Growth monitoring',
    'IFA tablets given',
    'ORS provided',
    'Other'
  ];

  const filteredPatients = patients.filter(p =>
    p.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.village?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id?.toString().includes(searchQuery)
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      servicesProvided: prev.servicesProvided.includes(service)
        ? prev.servicesProvided.filter(s => s !== service)
        : [...prev.servicesProvided, service]
    }));
  };

  const handleNext = () => {
    if (step === 1 && selectedPatient) setStep(2);
    else if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!selectedPatient) return;

    try {
      const visitData = {
        patientId: selectedPatient._id || selectedPatient.id,
        patientName: selectedPatient.fullName || selectedPatient.name,
        visitDate: new Date(`${formData.visitDate}T${formData.visitTime}`),
        visitType: formData.visitType,
        symptoms: formData.chiefComplaints,
        diagnosis: formData.condition,
        treatment: formData.detailedNotes,
        vitalSigns: {
          bloodPressure: formData.bpSystolic && formData.bpDiastolic 
            ? `${formData.bpSystolic}/${formData.bpDiastolic}` 
            : '',
          temperature: formData.temperature,
          pulse: formData.pulse,
          weight: formData.weight,
          height: formData.height,
        },
        notes: `Services: ${formData.servicesProvided.join(', ')}. Location: ${formData.location}`,
        followUpDate: formData.nextVisitDate ? new Date(formData.nextVisitDate) : null,
      };

      const response = await visitAPI.create(visitData);
      
      onSave(response.data);
      onClose();
      // Reset
      setStep(1);
    } catch (error) {
      console.error('Error recording visit:', error);
      alert('Failed to record visit. Please try again.');
    }
      setSelectedPatient(null);
      setFormData({
        visitDate: new Date().toISOString().split('T')[0],
        visitTime: new Date().toTimeString().slice(0, 5),
        visitType: '',
        location: '',
        gpsLat: (20.2961 + (Math.random() - 0.5) * 0.1).toFixed(6),
        gpsLon: (85.8245 + (Math.random() - 0.5) * 0.1).toFixed(6),
      chiefComplaints: '',
      temperature: '',
      bpSystolic: '',
      bpDiastolic: '',
      pulse: '',
      weight: '',
      height: '',
      condition: '',
      servicesProvided: [],
      detailedNotes: '',
      nextVisitDate: '',
      setReminder: false,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Record Home Visit - Step ${step}/5`} size="lg">
      {/* Step 1: Select Patient */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search patient by name, ID, or village..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
            />
          </div>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {filteredPatients.map(patient => (
              <label
                key={patient.id}
                className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selectedPatient?.id === patient.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                <input
                  type="radio"
                  name="selectedPatient"
                  checked={selectedPatient?.id === patient.id}
                  onChange={() => setSelectedPatient(patient)}
                  className="w-4 h-4"
                />
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  {patient.fullName?.charAt(0) || 'P'}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">{patient.fullName}</h4>
                  <p className="text-sm text-gray-600">Age: {patient.age} | Village: {patient.village}</p>
                </div>
              </label>
            ))}
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button variant="primary" onClick={handleNext} disabled={!selectedPatient} className="flex-1">
              Next: Visit Details
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Step 2: Visit Details */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Visit Date"
              name="visitDate"
              type="date"
              value={formData.visitDate}
              onChange={handleChange}
            />
            <InputField
              label="Visit Time"
              name="visitTime"
              type="time"
              value={formData.visitTime}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Visit Type</label>
            <select
              name="visitType"
              value={formData.visitType}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            >
              <option value="">Select visit type</option>
              {visitTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <InputField
            label="Location/Address"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
          />

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={20} className="text-primary" />
              <span className="font-medium">GPS Coordinates</span>
            </div>
            <p className="text-sm text-gray-600">
              Latitude: {formData.gpsLat} | Longitude: {formData.gpsLon}
            </p>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={handleBack}>Back</Button>
            <Button variant="primary" onClick={handleNext} className="flex-1">
              Next: Assessment
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Assessment */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chief Complaints</label>
            <textarea
              name="chiefComplaints"
              value={formData.chiefComplaints}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              placeholder="Describe chief complaints..."
            />
          </div>

          <h4 className="font-bold text-textDark">Vital Signs</h4>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Temperature (°F)"
              name="temperature"
              type="number"
              step="0.1"
              value={formData.temperature}
              onChange={handleChange}
              placeholder="98.6"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Pressure (mmHg)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="bpSystolic"
                  value={formData.bpSystolic}
                  onChange={handleChange}
                  placeholder="120"
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
                <span className="py-2">/</span>
                <input
                  type="number"
                  name="bpDiastolic"
                  value={formData.bpDiastolic}
                  onChange={handleChange}
                  placeholder="80"
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <InputField
              label="Pulse Rate (bpm)"
              name="pulse"
              type="number"
              value={formData.pulse}
              onChange={handleChange}
              placeholder="72"
            />
            <InputField
              label="Weight (kg)"
              name="weight"
              type="number"
              step="0.1"
              value={formData.weight}
              onChange={handleChange}
              placeholder="60"
            />
            <InputField
              label="Height (cm)"
              name="height"
              type="number"
              value={formData.height}
              onChange={handleChange}
              placeholder="165"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">General Condition</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="">Select condition</option>
                {conditionOptions.map(cond => (
                  <option key={cond} value={cond}>{cond}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={handleBack}>Back</Button>
            <Button variant="primary" onClick={handleNext} className="flex-1">
              Next: Services
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Services Provided */}
      {step === 4 && (
        <div className="space-y-4">
          <h4 className="font-bold text-textDark">Services Provided</h4>
          <div className="grid grid-cols-2 gap-3">
            {serviceOptions.map(service => (
              <label key={service} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.servicesProvided.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-sm">{service}</span>
              </label>
            ))}
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={handleBack}>Back</Button>
            <Button variant="primary" onClick={handleNext} className="flex-1">
              Next: Notes & Follow-up
            </Button>
          </div>
        </div>
      )}

      {/* Step 5: Notes & Follow-up */}
      {step === 5 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Notes</label>
            <textarea
              name="detailedNotes"
              value={formData.detailedNotes}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              placeholder="Enter detailed notes about the visit..."
            />
          </div>

          <InputField
            label="Next Visit Date"
            name="nextVisitDate"
            type="date"
            value={formData.nextVisitDate}
            onChange={handleChange}
          />

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="setReminder"
              checked={formData.setReminder}
              onChange={handleChange}
              className="w-4 h-4 text-primary"
            />
            <span className="text-sm">Set reminder for next visit</span>
          </label>

          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={handleBack}>Back</Button>
            <Button variant="primary" onClick={handleSubmit} className="flex-1">
              Save Visit Record
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default RecordVisitModal;
