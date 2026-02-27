import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CloudOff, CheckCircle, ArrowLeft, ArrowRight, User, Phone, Heart, Users as UsersIcon, Upload, Camera, FileText, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import Alert from '../components/Alert';
import { cardAPI } from '../services/api';

const OfflineDataCollection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [offlineData, setOfflineData] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: '',
    age: '',
    gender: '',
    aadhar: '',
    // Contact Information
    mobile: '',
    address: '',
    village: '',
    pinCode: '',
    // Health Profile
    bloodGroup: '',
    allergies: '',
    chronicConditions: '',
    // Family Information
    familyMembers: '',
    pregnantWomen: '',
    childrenUnder5: '',
    // Documents
    aadharPhoto: null,
    applicantPhoto: null,
  });

  const [photoPreview, setPhotoPreview] = useState({
    aadhar: null,
    applicant: null,
  });

  const totalSteps = 5;
  const stepLabels = ['Personal', 'Contact', 'Health', 'Family', 'Documents'];

  // Load offline data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('offlineApplications');
    if (savedData) {
      setOfflineData(JSON.parse(savedData));
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileUpload = (type, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview({
          ...photoPreview,
          [type]: reader.result,
        });
        setFormData({
          ...formData,
          [type === 'aadhar' ? 'aadharPhoto' : 'applicantPhoto']: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (type) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => handleFileUpload(type, e);
    input.click();
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Only allow submission on step 5
    if (currentStep !== totalSteps) {
      return;
    }
    
    // Validate that both documents are uploaded
    if (!formData.aadharPhoto || !formData.applicantPhoto) {
      alert('Please upload both Aadhar card and your photo before submitting');
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Save to localStorage (offline storage)
      const applicationData = {
        id: Date.now(),
        applicantName: formData.fullName,
        dateOfBirth: formData.age ? new Date(new Date().getFullYear() - parseInt(formData.age), 0, 1) : null,
        gender: formData.gender,
        phone: formData.mobile,
        address: formData.address,
        village: formData.village,
        pincode: formData.pinCode,
        aadharNumber: formData.aadhar,
        bloodGroup: formData.bloodGroup,
        allergies: formData.allergies,
        chronicConditions: formData.chronicConditions,
        familyMembersCount: formData.familyMembers ? parseInt(formData.familyMembers) : 0,
        pregnantWomenCount: formData.pregnantWomen ? parseInt(formData.pregnantWomen) : 0,
        childrenUnder5Count: formData.childrenUnder5 ? parseInt(formData.childrenUnder5) : 0,
        hasAadharPhoto: true,
        hasApplicantPhoto: true,
        timestamp: new Date().toISOString(),
        synced: false
      };

      // Add to offline data array
      const updatedOfflineData = [...offlineData, applicationData];
      setOfflineData(updatedOfflineData);
      
      // Save to localStorage
      localStorage.setItem('offlineApplications', JSON.stringify(updatedOfflineData));
      
      setShowSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Offline save error:', error);
      alert('Error saving data offline. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSync = async () => {
    if (offlineData.length === 0) {
      alert('No offline data to sync');
      return;
    }

    const unsyncedData = offlineData.filter(item => !item.synced);
    if (unsyncedData.length === 0) {
      alert('All data is already synced');
      return;
    }

    setIsSyncing(true);

    try {
      let successCount = 0;
      const updatedData = [...offlineData];

      for (let i = 0; i < unsyncedData.length; i++) {
        try {
          await cardAPI.apply(unsyncedData[i]);
          
          // Mark as synced
          const index = updatedData.findIndex(item => item.id === unsyncedData[i].id);
          if (index !== -1) {
            updatedData[index].synced = true;
          }
          successCount++;
        } catch (error) {
          console.error(`Failed to sync record ${unsyncedData[i].id}:`, error);
        }
      }

      // Update localStorage with synced status
      localStorage.setItem('offlineApplications', JSON.stringify(updatedData));
      setOfflineData(updatedData);

      alert(`Successfully synced ${successCount} out of ${unsyncedData.length} records to database`);
    } catch (error) {
      console.error('Sync error:', error);
      alert('Error syncing data. Please check your internet connection.');
    } finally {
      setIsSyncing(false);
    }
  };

  if (showSuccess) {
    const unsyncedCount = offlineData.filter(item => !item.synced).length;
    
    return (
      <div className="min-h-screen bg-cream py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center animate-fadeIn">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
            <h1 className="text-3xl font-bold text-textDark mb-4">
              Application Saved Offline!
            </h1>
            <p className="text-gray-600 mb-6">
              Your application has been stored locally. You can sync it to the database when you're online.
            </p>
            
            {unsyncedCount > 0 && (
              <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 mb-6">
                <p className="text-warning font-semibold">
                  {unsyncedCount} application{unsyncedCount > 1 ? 's' : ''} waiting to sync
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button variant="primary" onClick={() => navigate('/')}>
                Go to Home
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowSuccess(false);
                  setCurrentStep(1);
                  setFormData({
                    fullName: '',
                    age: '',
                    gender: '',
                    aadhar: '',
                    mobile: '',
                    address: '',
                    village: '',
                    pinCode: '',
                    bloodGroup: '',
                    allergies: '',
                    chronicConditions: '',
                    familyMembers: '',
                    pregnantWomen: '',
                    childrenUnder5: '',
                    aadharPhoto: null,
                    applicantPhoto: null,
                  });
                  setPhotoPreview({
                    aadhar: null,
                    applicant: null,
                  });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Add Another Application
              </Button>
            </div>

            {unsyncedCount > 0 && (
              <Button
                variant="secondary"
                icon={RefreshCw}
                onClick={handleSync}
                disabled={isSyncing}
                loading={isSyncing}
                fullWidth
              >
                {isSyncing ? 'Syncing...' : `Sync ${unsyncedCount} Application${unsyncedCount > 1 ? 's' : ''} to Database`}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            icon={ArrowLeft}
            onClick={() => navigate('/')}
            className="mb-4"
          >
            Back to Home
          </Button>
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <CloudOff className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-textDark mb-2">
              Offline Card Application
            </h1>
            <p className="text-gray-600">
              Fill in details offline - data will be saved locally and can be synced later
            </p>
            {offlineData.filter(item => !item.synced).length > 0 && (
              <div className="mt-4">
                <Button
                  variant="secondary"
                  icon={RefreshCw}
                  size="small"
                  onClick={handleSync}
                  disabled={isSyncing}
                  loading={isSyncing}
                >
                  {isSyncing ? 'Syncing...' : `Sync ${offlineData.filter(item => !item.synced).length} Records`}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <ProgressBar
          currentStep={currentStep}
          totalSteps={totalSteps}
          labels={stepLabels}
        />

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-fadeIn">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-textDark">
                    Personal Details
                  </h2>
                </div>

                <InputField
                  label="Full Name"
                  odiaLabel="ପୂର୍ଣ୍ଣ ନାମ"
                  bilingual
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  voiceInput
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Age"
                    odiaLabel="ବୟସ"
                    bilingual
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="Age"
                    required
                  />

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-textDark">
                      Gender <span className="text-gray-500 odia-text">(ଲିଙ୍ଗ)</span>
                      <span className="text-error ml-1">*</span>
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="input-field"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male / ପୁରୁଷ</option>
                      <option value="female">Female / ମହିଳା</option>
                      <option value="other">Other / ଅନ୍ୟ</option>
                    </select>
                  </div>
                </div>

                <InputField
                  label="Aadhar Number"
                  odiaLabel="ଆଧାର ନମ୍ବର"
                  bilingual
                  type="text"
                  value={formData.aadhar}
                  onChange={(e) => handleInputChange('aadhar', e.target.value)}
                  placeholder="XXXX-XXXX-XXXX"
                  required
                />
              </div>
            )}

            {/* Step 2: Contact Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-textDark">
                    Contact Information
                  </h2>
                </div>

                <InputField
                  label="Mobile Number"
                  odiaLabel="ମୋବାଇଲ୍ ନମ୍ବର"
                  bilingual
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  placeholder="10-digit mobile number"
                  required
                />

                <InputField
                  label="Address"
                  odiaLabel="ଠିକଣା"
                  bilingual
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Complete address"
                  voiceInput
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Village"
                    odiaLabel="ଗ୍ରାମ"
                    bilingual
                    value={formData.village}
                    onChange={(e) => handleInputChange('village', e.target.value)}
                    placeholder="Village name"
                    voiceInput
                    required
                  />

                  <InputField
                    label="PIN Code"
                    odiaLabel="ପିନ୍ କୋଡ୍"
                    bilingual
                    type="text"
                    value={formData.pinCode}
                    onChange={(e) => handleInputChange('pinCode', e.target.value)}
                    placeholder="6-digit PIN code"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 3: Health Profile */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-textDark">
                    Health Profile
                  </h2>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-textDark">
                    Blood Group <span className="text-gray-500 odia-text">(ରକ୍ତ ଗ୍ରୁପ୍)</span>
                  </label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select Blood Group</option>
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

                <InputField
                  label="Known Allergies"
                  odiaLabel="ଜଣାଶୁଣା ଆଲର୍ଜି"
                  bilingual
                  value={formData.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  placeholder="e.g., Penicillin, Peanuts (if any)"
                  voiceInput
                />

                <InputField
                  label="Chronic Conditions"
                  odiaLabel="ଦୀର୍ଘକାଳୀନ ରୋଗ"
                  bilingual
                  value={formData.chronicConditions}
                  onChange={(e) => handleInputChange('chronicConditions', e.target.value)}
                  placeholder="e.g., Diabetes, Hypertension (if any)"
                  voiceInput
                />

                <Alert
                  type="info"
                  message="This information helps healthcare workers provide better care tailored to your needs."
                />
              </div>
            )}

            {/* Step 4: Family Information */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <UsersIcon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-textDark">
                    Family Information
                  </h2>
                </div>

                <InputField
                  label="Total Family Members"
                  odiaLabel="ମୋଟ ପରିବାର ସଦସ୍ୟ"
                  bilingual
                  type="number"
                  value={formData.familyMembers}
                  onChange={(e) => handleInputChange('familyMembers', e.target.value)}
                  placeholder="Number of family members"
                />

                <InputField
                  label="Pregnant Women in Family"
                  odiaLabel="ପରିବାରରେ ଗର୍ଭବତୀ ମହିଳା"
                  bilingual
                  type="number"
                  value={formData.pregnantWomen}
                  onChange={(e) => handleInputChange('pregnantWomen', e.target.value)}
                  placeholder="Number (if any)"
                />

                <InputField
                  label="Children Under 5 Years"
                  odiaLabel="5 ବର୍ଷରୁ କମ୍ ପିଲା"
                  bilingual
                  type="number"
                  value={formData.childrenUnder5}
                  onChange={(e) => handleInputChange('childrenUnder5', e.target.value)}
                  placeholder="Number (if any)"
                />
              </div>
            )}

            {/* Step 5: Document Upload */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-textDark">
                    Upload Documents
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Aadhar Card Upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                    {photoPreview.aadhar ? (
                      <div className="space-y-4">
                        <img
                          src={photoPreview.aadhar}
                          alt="Aadhar preview"
                          className="max-h-48 mx-auto rounded-lg"
                        />
                        <p className="text-sm text-success font-medium">✓ Aadhar card uploaded</p>
                        <Button
                          type="button"
                          variant="outline"
                          size="small"
                          onClick={() => {
                            setPhotoPreview({ ...photoPreview, aadhar: null });
                            setFormData({ ...formData, aadharPhoto: null });
                          }}
                        >
                          Change Photo
                        </Button>
                      </div>
                    ) : (
                      <>
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="font-semibold text-textDark mb-2">
                          Aadhar Card
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Upload clear photo of your Aadhar card
                        </p>
                        <div className="flex gap-3 justify-center">
                          <label className="btn-outline py-2 px-4 text-sm flex items-center justify-center gap-2 cursor-pointer rounded-lg">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload('aadhar', e)}
                              className="hidden"
                            />
                            <Upload size={20} />
                            Upload File
                          </label>
                          <Button
                            type="button"
                            variant="outline"
                            icon={Camera}
                            size="small"
                            onClick={() => handleCameraCapture('aadhar')}
                          >
                            Take Photo
                          </Button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Photo Upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                    {photoPreview.applicant ? (
                      <div className="space-y-4">
                        <img
                          src={photoPreview.applicant}
                          alt="Applicant preview"
                          className="max-h-48 mx-auto rounded-lg"
                        />
                        <p className="text-sm text-success font-medium">✓ Photo uploaded</p>
                        <Button
                          type="button"
                          variant="outline"
                          size="small"
                          onClick={() => {
                            setPhotoPreview({ ...photoPreview, applicant: null });
                            setFormData({ ...formData, applicantPhoto: null });
                          }}
                        >
                          Change Photo
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="font-semibold text-textDark mb-2">
                          Your Photo
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Upload a recent passport-size photo
                        </p>
                        <div className="flex gap-3 justify-center">
                          <label className="btn-outline py-2 px-4 text-sm flex items-center justify-center gap-2 cursor-pointer rounded-lg">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload('applicant', e)}
                              className="hidden"
                            />
                            <Upload size={20} />
                            Upload File
                          </label>
                          <Button
                            type="button"
                            variant="outline"
                            icon={Camera}
                            size="small"
                            onClick={() => handleCameraCapture('applicant')}
                          >
                            Take Photo
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <Alert
                  type="warning"
                  message="Data will be saved offline. Click Sync button to upload to database when online."
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  icon={ArrowLeft}
                  onClick={handlePrevious}
                >
                  Previous
                </Button>
              )}
              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  variant="primary"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={handleNext}
                  className={currentStep === 1 ? 'ml-auto' : ''}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  icon={CheckCircle}
                  iconPosition="right"
                  disabled={isSubmitting || !formData.aadharPhoto || !formData.applicantPhoto}
                  loading={isSubmitting}
                >
                  {isSubmitting ? 'Saving Offline...' : 'Save Offline'}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OfflineDataCollection;
