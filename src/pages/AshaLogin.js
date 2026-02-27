import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { User, ArrowRight, HelpCircle, Phone, UserPlus } from 'lucide-react';
import Button from '../components/Button';
import InputField from '../components/InputField';
import Alert from '../components/Alert';
import { authAPI } from '../services/api';

const AshaLogin = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [workerId, setWorkerId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!workerId.trim()) {
      setError('Please enter your ASHA Worker ID');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await authAPI.login({ workerId });
      
      // Save token and user data to localStorage
      localStorage.setItem('ashaToken', response.token);
      localStorage.setItem('ashaUser', JSON.stringify(response));
      
      // Navigate to dashboard
      navigate('/asha-dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your Worker ID.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !phone.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await authAPI.signup({ name, phone });
      
      setSuccessMessage(
        `✅ Registration Successful!\n\nYour Unique ASHA ID: ${response.workerId}\n\nPlease save this ID. You'll need it to login.`
      );
      
      // Clear form
      setName('');
      setPhone('');
      
      // Auto-switch to login mode after 3 seconds
      setTimeout(() => {
        setIsSignUpMode(false);
        setWorkerId(response.workerId);
        setSuccessMessage('');
      }, 5000);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-primary/5 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-textDark mb-2">
              {isSignUpMode ? 'ASHA Sign Up' : t('ashaLogin')}
            </h1>
            <p className="text-gray-600">
              {isSignUpMode ? 'Register as ASHA Worker' : 'Welcome ASHA Workers'}
            </p>
            <p className="text-sm text-gray-600 odia-text mt-1">
              {isSignUpMode ? 'ଆଶା କର୍ମୀ ପଞ୍ଜୀକରଣ' : 'ଆଶା କର୍ମୀଙ୍କୁ ସ୍ୱାଗତ'}
            </p>
          </div>

          {/* Login/Signup Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
            {error && (
              <Alert type="error" message={error} onClose={() => setError('')} className="mb-6" />
            )}

            {successMessage && (
              <Alert type="success" message={successMessage} className="mb-6" />
            )}

            {!isSignUpMode ? (
              // Login Form
              <form onSubmit={handleLogin} className="space-y-6">
                <InputField
                  label="ASHA Worker ID"
                  odiaLabel="ଆଶା କର୍ମୀ ID"
                  bilingual
                  type="text"
                  value={workerId}
                  onChange={(e) => setWorkerId(e.target.value)}
                  placeholder="Enter your ASHA Worker ID (e.g., ASHA001234)"
                  icon={User}
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="large"
                  icon={ArrowRight}
                  iconPosition="right"
                  loading={isLoading}
                >
                  Login
                </Button>
              </form>
            ) : (
              // Sign Up Form
              <form onSubmit={handleSignUp} className="space-y-6">
                <InputField
                  label="Full Name"
                  odiaLabel="ପୂର୍ଣ୍ଣ ନାମ"
                  bilingual
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  icon={User}
                  required
                />

                <InputField
                  label="Mobile Number"
                  odiaLabel="ମୋବାଇଲ୍ ନମ୍ବର"
                  bilingual
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  icon={Phone}
                  required
                  maxLength={10}
                />

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="large"
                  icon={UserPlus}
                  iconPosition="right"
                  loading={isLoading}
                >
                  Sign Up
                </Button>
              </form>
            )}

            {/* Toggle Sign Up / Login */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUpMode(!isSignUpMode);
                  setError('');
                  setSuccessMessage('');
                  setWorkerId('');
                  setName('');
                  setPhone('');
                }}
                className="text-accent hover:text-accent-dark font-medium text-sm transition-colors"
              >
                {isSignUpMode
                  ? '← Already have an ID? Login here'
                  : "Don't have an ID? Sign up here →"}
              </button>
            </div>

            {/* Help Link */}
            <div className="mt-6 text-center">
              <a
                href="/help"
                className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-medium text-sm"
              >
                <HelpCircle size={16} />
                Need Help?
              </a>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-primary/5 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> {isSignUpMode 
                ? 'After registration, you will receive a unique ASHA ID. Save it for future logins.'
                : 'This portal is exclusively for registered ASHA workers. Sign up to get your unique ID.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AshaLogin;
