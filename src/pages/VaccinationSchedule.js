import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Syringe,
  Baby,
  Bell,
  Phone,
  Search,
  Filter,
  Download,
  ArrowLeft,
} from 'lucide-react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Alert from '../components/Alert';
import { useNavigate } from 'react-router-dom';

const VaccinationSchedule = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // State Management
  const [step, setStep] = useState(1); // 1: Input, 2: Schedule Display
  const [childName, setChildName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [childAge, setChildAge] = useState(null);
  const [vaccineSchedule, setVaccineSchedule] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all'); // all, completed, upcoming, missed
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  // Complete Vaccination Schedule (as per Indian Immunization Schedule)
  const completeVaccineSchedule = [
    // Birth
    { name: 'BCG', nameOd: 'ବିସିଜି', age: 0, ageUnit: 'birth', description: 'Bacillus Calmette–Guérin (Tuberculosis)', dose: 1 },
    { name: 'OPV 0', nameOd: 'ଓପିଭି ୦', age: 0, ageUnit: 'birth', description: 'Oral Polio Vaccine (Birth dose)', dose: 0 },
    { name: 'Hepatitis B 0', nameOd: 'ହେପାଟାଇଟିସ୍ ବି ୦', age: 0, ageUnit: 'birth', description: 'Hepatitis B (Birth dose)', dose: 0 },
    
    // 6 Weeks
    { name: 'OPV 1', nameOd: 'ଓପିଭି ୧', age: 6, ageUnit: 'weeks', description: 'Oral Polio Vaccine (1st dose)', dose: 1 },
    { name: 'Pentavalent 1', nameOd: 'ପେଣ୍ଟାଭାଲେଣ୍ଟ୍ ୧', age: 6, ageUnit: 'weeks', description: 'DPT, Hep B, Hib (1st dose)', dose: 1 },
    { name: 'Rotavirus 1', nameOd: 'ରୋଟାଭାଇରସ୍ ୧', age: 6, ageUnit: 'weeks', description: 'Rotavirus Vaccine (1st dose)', dose: 1 },
    { name: 'PCV 1', nameOd: 'ପିସିଭି ୧', age: 6, ageUnit: 'weeks', description: 'Pneumococcal Conjugate (1st dose)', dose: 1 },
    
    // 10 Weeks
    { name: 'OPV 2', nameOd: 'ଓପିଭି ୨', age: 10, ageUnit: 'weeks', description: 'Oral Polio Vaccine (2nd dose)', dose: 2 },
    { name: 'Pentavalent 2', nameOd: 'ପେଣ୍ଟାଭାଲେଣ୍ଟ୍ ୨', age: 10, ageUnit: 'weeks', description: 'DPT, Hep B, Hib (2nd dose)', dose: 2 },
    { name: 'Rotavirus 2', nameOd: 'ରୋଟାଭାଇରସ୍ ୨', age: 10, ageUnit: 'weeks', description: 'Rotavirus Vaccine (2nd dose)', dose: 2 },
    
    // 14 Weeks
    { name: 'OPV 3', nameOd: 'ଓପିଭି ୩', age: 14, ageUnit: 'weeks', description: 'Oral Polio Vaccine (3rd dose)', dose: 3 },
    { name: 'Pentavalent 3', nameOd: 'ପେଣ୍ଟାଭାଲେଣ୍ଟ୍ ୩', age: 14, ageUnit: 'weeks', description: 'DPT, Hep B, Hib (3rd dose)', dose: 3 },
    { name: 'Rotavirus 3', nameOd: 'ରୋଟାଭାଇରସ୍ ୩', age: 14, ageUnit: 'weeks', description: 'Rotavirus Vaccine (3rd dose)', dose: 3 },
    { name: 'PCV 2', nameOd: 'ପିସିଭି ୨', age: 14, ageUnit: 'weeks', description: 'Pneumococcal Conjugate (2nd dose)', dose: 2 },
    { name: 'IPV 1', nameOd: 'ଆଇପିଭି ୧', age: 14, ageUnit: 'weeks', description: 'Injectable Polio Vaccine (1st dose)', dose: 1 },
    
    // 9 Months
    { name: 'Measles-Rubella 1', nameOd: 'ମିଜଲସ୍-ରୁବେଲା ୧', age: 9, ageUnit: 'months', description: 'Measles-Rubella (1st dose)', dose: 1 },
    { name: 'PCV Booster', nameOd: 'ପିସିଭି ବୁଷ୍ଟର', age: 9, ageUnit: 'months', description: 'Pneumococcal Conjugate (Booster)', dose: 3 },
    { name: 'Vitamin A 1', nameOd: 'ଭିଟାମିନ୍ ଏ ୧', age: 9, ageUnit: 'months', description: 'Vitamin A (1st dose)', dose: 1 },
    
    // 12 Months
    { name: 'Vitamin A 2', nameOd: 'ଭିଟାମିନ୍ ଏ ୨', age: 12, ageUnit: 'months', description: 'Vitamin A (2nd dose)', dose: 2 },
    
    // 16-24 Months
    { name: 'DPT Booster 1', nameOd: 'ଡିପିଟି ବୁଷ୍ଟର ୧', age: 16, ageUnit: 'months', description: 'DPT (Booster 1)', dose: 4 },
    { name: 'OPV Booster', nameOd: 'ଓପିଭି ବୁଷ୍ଟର', age: 16, ageUnit: 'months', description: 'Oral Polio Vaccine (Booster)', dose: 4 },
    { name: 'Measles-Rubella 2', nameOd: 'ମିଜଲସ୍-ରୁବେଲା ୨', age: 16, ageUnit: 'months', description: 'Measles-Rubella (2nd dose)', dose: 2 },
    
    // 5-6 Years
    { name: 'DPT Booster 2', nameOd: 'ଡିପିଟି ବୁଷ୍ଟର ୨', age: 5, ageUnit: 'years', description: 'DPT (Booster 2)', dose: 5 },
    
    // 10 Years
    { name: 'Tetanus-Diphtheria', nameOd: 'ଟେଟାନସ୍-ଡିଫଥେରିଆ', age: 10, ageUnit: 'years', description: 'Td Vaccine', dose: 1 },
  ];

  // Calculate age from date of birth
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const ageInDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
    const ageInWeeks = Math.floor(ageInDays / 7);
    const ageInMonths = Math.floor(ageInDays / 30);
    const ageInYears = Math.floor(ageInDays / 365);

    return {
      days: ageInDays,
      weeks: ageInWeeks,
      months: ageInMonths,
      years: ageInYears,
      display: ageInYears > 0
        ? `${ageInYears} year${ageInYears > 1 ? 's' : ''}`
        : ageInMonths > 0
        ? `${ageInMonths} month${ageInMonths > 1 ? 's' : ''}`
        : `${ageInWeeks} week${ageInWeeks > 1 ? 's' : ''}`,
    };
  };

  // Convert vaccine age to comparable format (in days)
  const vaccineAgeToDays = (age, unit) => {
    switch (unit) {
      case 'birth':
        return 0;
      case 'weeks':
        return age * 7;
      case 'months':
        return age * 30;
      case 'years':
        return age * 365;
      default:
        return 0;
    }
  };

  // Determine vaccine status
  const getVaccineStatus = (vaccine, childAgeDays) => {
    const vaccineDueDays = vaccineAgeToDays(vaccine.age, vaccine.ageUnit);
    const gracePeriodDays = 14; // 2 weeks grace period
    
    if (childAgeDays < vaccineDueDays) {
      return 'upcoming';
    } else if (childAgeDays >= vaccineDueDays && childAgeDays < vaccineDueDays + gracePeriodDays) {
      return 'due';
    } else {
      return 'missed';
    }
  };

  // Process schedule based on child's age
  const processVaccineSchedule = () => {
    if (!dateOfBirth) return;

    const age = calculateAge(dateOfBirth);
    setChildAge(age);

    const processed = completeVaccineSchedule.map((vaccine) => {
      const vaccineDueDays = vaccineAgeToDays(vaccine.age, vaccine.ageUnit);
      const status = getVaccineStatus(vaccine, age.days);
      const dueDate = new Date(dateOfBirth);
      dueDate.setDate(dueDate.getDate() + vaccineDueDays);

      // For demo, randomly mark some as completed
      const isCompleted = status !== 'upcoming' && Math.random() > 0.5;

      return {
        ...vaccine,
        dueDate: dueDate.toLocaleDateString('en-IN'),
        status: isCompleted ? 'completed' : status,
        vaccineDueDays,
      };
    });

    setVaccineSchedule(processed);
    setStep(2);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!childName || !dateOfBirth || !parentPhone) {
      alert('Please fill all required fields');
      return;
    }
    processVaccineSchedule();
  };

  // Filter vaccines based on status
  const filteredVaccines = vaccineSchedule.filter((vaccine) => {
    if (filterStatus === 'all') return true;
    return vaccine.status === filterStatus;
  });

  // Count vaccines by status
  const vaccineCounts = {
    completed: vaccineSchedule.filter((v) => v.status === 'completed').length,
    upcoming: vaccineSchedule.filter((v) => v.status === 'upcoming').length,
    due: vaccineSchedule.filter((v) => v.status === 'due').length,
    missed: vaccineSchedule.filter((v) => v.status === 'missed').length,
  };

  // Enable reminders
  const handleEnableReminders = () => {
    setReminderEnabled(true);
    alert(`Reminders enabled! SMS notifications will be sent to ${parentPhone} before each vaccine due date.`);
  };

  // Download schedule
  const handleDownloadSchedule = () => {
    const scheduleText = vaccineSchedule
      .map(
        (v) =>
          `${v.name} - Due: ${v.dueDate} - Status: ${v.status.toUpperCase()}`
      )
      .join('\n');
    const blob = new Blob([scheduleText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${childName}_vaccination_schedule.txt`;
    a.click();
  };

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      completed: {
        icon: CheckCircle,
        color: 'bg-success/10 text-success border-success',
        label: language === 'od' ? 'ସମ୍ପୂର୍ଣ୍ଣ' : 'Completed',
      },
      upcoming: {
        icon: Clock,
        color: 'bg-info/10 text-info border-info',
        label: language === 'od' ? 'ଆଗାମୀ' : 'Upcoming',
      },
      due: {
        icon: Bell,
        color: 'bg-warning/10 text-warning border-warning',
        label: language === 'od' ? 'ବାକି' : 'Due Now',
      },
      missed: {
        icon: AlertTriangle,
        color: 'bg-danger/10 text-danger border-danger',
        label: language === 'od' ? 'ମିସ୍ ହୋଇଛି' : 'Missed',
      },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${config.color}`}
      >
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-primary/5 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <Syringe className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-textDark mb-3">
            {language === 'od' ? 'ଟୀକାକରଣ କାର୍ଯ୍ୟସୂଚୀ' : 'Vaccination Schedule'}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {language === 'od'
              ? 'ଆପଣଙ୍କ ଶିଶୁର ଟୀକାକରଣ କାର୍ଯ୍ୟସୂଚୀ ଟ୍ରାକ୍ କରନ୍ତୁ ଏବଂ ସମୟାନୁସାରେ ସୂଚନା ପାଆନ୍ତୁ'
              : 'Track your child\'s vaccination schedule and get timely reminders'}
          </p>
        </div>

        {/* Step 1: Input Form */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto">
            <div className="card p-8 animate-slideUp">
              <div className="flex items-center gap-3 mb-6">
                <Baby className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold text-textDark">
                  {language === 'od' ? 'ଶିଶୁର ବିବରଣୀ' : 'Child Information'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                  label={language === 'od' ? 'ଶିଶୁର ନାମ' : 'Child Name'}
                  required
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder={language === 'od' ? 'ଶିଶୁର ନାମ ଲେଖନ୍ତୁ' : 'Enter child name'}
                />

                <InputField
                  label={language === 'od' ? 'ଜନ୍ମ ତାରିଖ' : 'Date of Birth'}
                  type="date"
                  required
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />

                <InputField
                  label={language === 'od' ? 'ପିତା/ମାତାଙ୍କ ଫୋନ୍ ନମ୍ବର' : 'Parent Phone Number'}
                  type="tel"
                  required
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  pattern="[0-9]{10}"
                />

                <Alert
                  type="info"
                  message={
                    language === 'od'
                      ? 'ଆମେ ଆପଣଙ୍କୁ ଟୀକାକରଣର ସମୟ ପୂର୍ବରୁ SMS ମାଧ୍ୟମରେ ମନେ ପକାଇବୁ'
                      : 'We will send you SMS reminders before each vaccination due date'
                  }
                />

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    icon={ArrowLeft}
                    onClick={() => navigate(-1)}
                  >
                    {language === 'od' ? 'ପଛକୁ' : 'Back'}
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    icon={Calendar}
                    iconPosition="right"
                    className="flex-1"
                  >
                    {language === 'od' ? 'କାର୍ଯ୍ୟସୂଚୀ ଦେଖନ୍ତୁ' : 'View Schedule'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Step 2: Schedule Display */}
        {step === 2 && (
          <div className="animate-slideUp space-y-6">
            {/* Child Info Card */}
            <div className="card p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <Baby className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-textDark">{childName}</h3>
                    <p className="text-gray-600">
                      {language === 'od' ? 'ବୟସ' : 'Age'}: {childAge?.display}
                    </p>
                    <p className="text-gray-500 text-sm flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {parentPhone}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    icon={Download}
                    onClick={handleDownloadSchedule}
                  >
                    {language === 'od' ? 'ଡାଉନଲୋଡ୍' : 'Download'}
                  </Button>
                  {!reminderEnabled ? (
                    <Button
                      variant="primary"
                      icon={Bell}
                      onClick={handleEnableReminders}
                    >
                      {language === 'od' ? 'ରିମାଇଣ୍ଡର୍ ସକ୍ରିୟ କରନ୍ତୁ' : 'Enable Reminders'}
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-lg border border-success">
                      <Bell className="w-5 h-5" />
                      <span className="font-semibold">
                        {language === 'od' ? 'ରିମାଇଣ୍ଡର୍ ସକ୍ରିୟ' : 'Reminders Active'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="card p-6 bg-gradient-to-br from-success/10 to-success/5 border-l-4 border-success">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-6 h-6 text-success" />
                  <h4 className="font-semibold text-gray-700">
                    {language === 'od' ? 'ସମ୍ପୂର୍ଣ୍ଣ' : 'Completed'}
                  </h4>
                </div>
                <p className="text-3xl font-bold text-success">{vaccineCounts.completed}</p>
              </div>

              <div className="card p-6 bg-gradient-to-br from-info/10 to-info/5 border-l-4 border-info">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-6 h-6 text-info" />
                  <h4 className="font-semibold text-gray-700">
                    {language === 'od' ? 'ଆଗାମୀ' : 'Upcoming'}
                  </h4>
                </div>
                <p className="text-3xl font-bold text-info">{vaccineCounts.upcoming}</p>
              </div>

              <div className="card p-6 bg-gradient-to-br from-warning/10 to-warning/5 border-l-4 border-warning">
                <div className="flex items-center gap-3 mb-2">
                  <Bell className="w-6 h-6 text-warning" />
                  <h4 className="font-semibold text-gray-700">
                    {language === 'od' ? 'ବାକି' : 'Due Now'}
                  </h4>
                </div>
                <p className="text-3xl font-bold text-warning">{vaccineCounts.due}</p>
              </div>

              <div className="card p-6 bg-gradient-to-br from-danger/10 to-danger/5 border-l-4 border-danger">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="w-6 h-6 text-danger" />
                  <h4 className="font-semibold text-gray-700">
                    {language === 'od' ? 'ମିସ୍ ହୋଇଛି' : 'Missed'}
                  </h4>
                </div>
                <p className="text-3xl font-bold text-danger">{vaccineCounts.missed}</p>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="card p-4">
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={filterStatus === 'all' ? 'primary' : 'outline'}
                  size="small"
                  onClick={() => setFilterStatus('all')}
                >
                  {language === 'od' ? 'ସମସ୍ତ' : 'All'} ({vaccineSchedule.length})
                </Button>
                <Button
                  variant={filterStatus === 'completed' ? 'primary' : 'outline'}
                  size="small"
                  icon={CheckCircle}
                  onClick={() => setFilterStatus('completed')}
                >
                  {language === 'od' ? 'ସମ୍ପୂର୍ଣ୍ଣ' : 'Completed'} ({vaccineCounts.completed})
                </Button>
                <Button
                  variant={filterStatus === 'upcoming' ? 'primary' : 'outline'}
                  size="small"
                  icon={Clock}
                  onClick={() => setFilterStatus('upcoming')}
                >
                  {language === 'od' ? 'ଆଗାମୀ' : 'Upcoming'} ({vaccineCounts.upcoming})
                </Button>
                <Button
                  variant={filterStatus === 'missed' ? 'primary' : 'outline'}
                  size="small"
                  icon={AlertTriangle}
                  onClick={() => setFilterStatus('missed')}
                >
                  {language === 'od' ? 'ମିସ୍ ହୋଇଛି' : 'Missed'} ({vaccineCounts.missed})
                </Button>
              </div>
            </div>

            {/* Vaccine List */}
            <div className="space-y-4">
              {filteredVaccines.length === 0 ? (
                <div className="card p-12 text-center">
                  <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    {language === 'od'
                      ? 'ଏହି ବର୍ଗରେ କୌଣସି ଟୀକା ନାହିଁ'
                      : 'No vaccines in this category'}
                  </p>
                </div>
              ) : (
                filteredVaccines.map((vaccine, index) => (
                  <div
                    key={index}
                    className={`card p-6 transition-all hover:shadow-lg ${
                      vaccine.status === 'missed' ? 'border-l-4 border-danger' : ''
                    } ${vaccine.status === 'due' ? 'border-l-4 border-warning' : ''}`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            vaccine.status === 'completed'
                              ? 'bg-success/20'
                              : vaccine.status === 'upcoming'
                              ? 'bg-info/20'
                              : vaccine.status === 'due'
                              ? 'bg-warning/20'
                              : 'bg-danger/20'
                          }`}
                        >
                          <Syringe
                            className={`w-6 h-6 ${
                              vaccine.status === 'completed'
                                ? 'text-success'
                                : vaccine.status === 'upcoming'
                                ? 'text-info'
                                : vaccine.status === 'due'
                                ? 'text-warning'
                                : 'text-danger'
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-2">
                            <div>
                              <h3 className="text-xl font-bold text-textDark">
                                {language === 'od' ? vaccine.nameOd : vaccine.name}
                              </h3>
                              <p className="text-gray-600 text-sm">{vaccine.description}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {language === 'od' ? 'ବାଧ୍ୟତାମୂଳକ ତାରିଖ' : 'Due Date'}: {vaccine.dueDate}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Baby className="w-4 h-4" />
                              <span>
                                {language === 'od' ? 'ବୟସ' : 'Age'}:{' '}
                                {vaccine.ageUnit === 'birth'
                                  ? language === 'od'
                                    ? 'ଜନ୍ମ ସମୟରେ'
                                    : 'At Birth'
                                  : `${vaccine.age} ${vaccine.ageUnit}`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <StatusBadge status={vaccine.status} />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                icon={ArrowLeft}
                onClick={() => {
                  setStep(1);
                  setChildName('');
                  setDateOfBirth('');
                  setParentPhone('');
                  setVaccineSchedule([]);
                  setReminderEnabled(false);
                }}
              >
                {language === 'od' ? 'ନୂଆ ସନ୍ଧାନ' : 'New Search'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VaccinationSchedule;
