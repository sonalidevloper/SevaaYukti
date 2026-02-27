import React, { useState } from 'react';
import Modal from './Modal';
import InputField from './InputField';
import Button from './Button';
import { Search } from 'lucide-react';
import { vaccinationAPI } from '../services/api';

const LogVaccinationModal = ({ isOpen, onClose, onSave, patients }) => {
  const [step, setStep] = useState(1);
  const [selectedChild, setSelectedChild] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    vaccineType: '',
    vaccineDose: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    batchNumber: '',
    administeredBy: 'Sunita Behera',
    injectionSite: '',
    adverseReactions: false,
    reactionDescription: '',
    guardianSignature: '',
  });

  const vaccineTypes = [
    { name: 'BCG', hasDoses: false },
    { name: 'OPV (Oral Polio)', doses: ['Dose 1', 'Dose 2', 'Dose 3'] },
    { name: 'Pentavalent', doses: ['Dose 1', 'Dose 2', 'Dose 3'] },
    { name: 'IPV (Polio Injection)', hasDoses: false },
    { name: 'Measles-Rubella', doses: ['Dose 1', 'Dose 2'] },
    { name: 'DPT Booster', hasDoses: false },
    { name: 'Vitamin A', hasDoses: false },
    { name: 'Other', hasDoses: false },
  ];

  const injectionSites = ['Left arm', 'Right arm', 'Left thigh', 'Right thigh', 'Oral'];

  const children = patients.filter(p => p.isChild || p.age < 6);

  const filteredChildren = children.filter(c =>
    c.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id?.toString().includes(searchQuery)
  );

  const selectedVaccine = vaccineTypes.find(v => v.name === formData.vaccineType);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    if (step === 1 && selectedChild) setStep(2);
    else if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const calculateNextVaccine = () => {
    // Simple logic to suggest next vaccine based on current one
    const vaccineSchedule = {
      'BCG': 'OPV Dose 1 (at 6 weeks)',
      'OPV (Oral Polio) - Dose 1': 'Pentavalent Dose 1 (at 6 weeks)',
      'Pentavalent - Dose 1': 'OPV Dose 2 (at 10 weeks)',
      'OPV (Oral Polio) - Dose 2': 'Pentavalent Dose 2 (at 10 weeks)',
      'Pentavalent - Dose 2': 'OPV Dose 3 (at 14 weeks)',
      'OPV (Oral Polio) - Dose 3': 'Pentavalent Dose 3 (at 14 weeks)',
      'Pentavalent - Dose 3': 'IPV (at 14 weeks)',
      'IPV (Polio Injection)': 'Measles-Rubella Dose 1 (at 9 months)',
      'Measles-Rubella - Dose 1': 'Measles-Rubella Dose 2 (at 16-24 months)',
    };

    const key = formData.vaccineDose 
      ? `${formData.vaccineType} - ${formData.vaccineDose}`
      : formData.vaccineType;
    
    return vaccineSchedule[key] || 'Check with medical officer';
  };

  const handleSubmit = async () => {
    if (!selectedChild) return;

    try {
      const vaccinationData = {
        patientId: selectedChild._id || selectedChild.id,
        patientName: selectedChild.fullName || selectedChild.name,
        vaccineName: formData.vaccineType,
        vaccineType: formData.vaccineType,
        doseNumber: formData.vaccineDose ? parseInt(formData.vaccineDose.match(/\d+/)[0]) : 1,
        dateAdministered: new Date(`${formData.date}T${formData.time}`),
        batchNumber: formData.batchNumber,
        administeredByName: formData.administeredBy,
        sideEffects: formData.adverseReactions ? formData.reactionDescription : '',
        notes: `Injection Site: ${formData.injectionSite}`,
      };

      const response = await vaccinationAPI.create(vaccinationData);
      
      onSave(response.data);
      onClose();
      // Reset
      setStep(1);
    } catch (error) {
      console.error('Error logging vaccination:', error);
      alert('Failed to log vaccination. Please try again.');
    }
    setSelectedChild(null);
    setFormData({
      vaccineType: '',
      vaccineDose: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      batchNumber: '',
      administeredBy: 'Sunita Behera',
      injectionSite: '',
      adverseReactions: false,
      reactionDescription: '',
      guardianSignature: '',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Log Vaccination - Step ${step}/4`} size="lg">
      {/* Step 1: Select Child */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search child by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
            />
          </div>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {filteredChildren.map(child => (
              <label
                key={child.id}
                className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selectedChild?.id === child.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                <input
                  type="radio"
                  name="selectedChild"
                  checked={selectedChild?.id === child.id}
                  onChange={() => setSelectedChild(child)}
                  className="w-4 h-4"
                />
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  {child.fullName?.charAt(0) || 'C'}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">{child.fullName}</h4>
                  <p className="text-sm text-gray-600">Age: {child.age} years | Village: {child.village}</p>
                </div>
              </label>
            ))}
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button variant="primary" onClick={handleNext} disabled={!selectedChild} className="flex-1">
              Next: Vaccination Details
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Step 2: Vaccination Details */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vaccine Type *</label>
            <select
              name="vaccineType"
              value={formData.vaccineType}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            >
              <option value="">Select vaccine type</option>
              {vaccineTypes.map(vaccine => (
                <option key={vaccine.name} value={vaccine.name}>{vaccine.name}</option>
              ))}
            </select>
          </div>

          {selectedVaccine?.doses && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dose *</label>
              <select
                name="vaccineDose"
                value={formData.vaccineDose}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="">Select dose</option>
                {selectedVaccine.doses.map(dose => (
                  <option key={dose} value={dose}>{dose}</option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Date of Vaccination"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
            <InputField
              label="Time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>

          <InputField
            label="Batch Number"
            name="batchNumber"
            value={formData.batchNumber}
            onChange={handleChange}
            placeholder="Enter batch number"
          />

          <InputField
            label="Administered By"
            name="administeredBy"
            value={formData.administeredBy}
            onChange={handleChange}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Site of Injection</label>
            <select
              name="injectionSite"
              value={formData.injectionSite}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            >
              <option value="">Select injection site</option>
              {injectionSites.map(site => (
                <option key={site} value={site}>{site}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={handleBack}>Back</Button>
            <Button variant="primary" onClick={handleNext} className="flex-1">
              Next: Post-Vaccination
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Post-Vaccination */}
      {step === 3 && (
        <div className="space-y-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="adverseReactions"
              checked={formData.adverseReactions}
              onChange={handleChange}
              className="w-4 h-4 text-primary"
            />
            <span className="text-sm font-medium">Any Adverse Reactions?</span>
          </label>

          {formData.adverseReactions && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Describe Reactions</label>
              <textarea
                name="reactionDescription"
                value={formData.reactionDescription}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                placeholder="Describe any adverse reactions..."
              />
            </div>
          )}

          <InputField
            label="Parent/Guardian Signature"
            name="guardianSignature"
            value={formData.guardianSignature}
            onChange={handleChange}
            placeholder="Type guardian name"
          />

          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={handleBack}>Back</Button>
            <Button variant="primary" onClick={handleNext} className="flex-1">
              Next: Next Due Vaccine
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Next Due Vaccines */}
      {step === 4 && (
        <div className="space-y-4">
          <div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent">
            <h4 className="font-bold text-textDark mb-2">Next Vaccine Due</h4>
            <p className="text-gray-700">{calculateNextVaccine()}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-textDark mb-3">Vaccination Summary</h4>
            <div className="space-y-2 text-sm">
              <p><strong>Child:</strong> {selectedChild?.fullName}</p>
              <p><strong>Vaccine:</strong> {formData.vaccineType} {formData.vaccineDose && `- ${formData.vaccineDose}`}</p>
              <p><strong>Date:</strong> {formData.date} at {formData.time}</p>
              <p><strong>Batch:</strong> {formData.batchNumber}</p>
              <p><strong>Site:</strong> {formData.injectionSite}</p>
              <p><strong>Adverse Reactions:</strong> {formData.adverseReactions ? 'Yes' : 'No'}</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={handleBack}>Back</Button>
            <Button variant="primary" onClick={handleSubmit} className="flex-1">
              Save Vaccination Record
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default LogVaccinationModal;
