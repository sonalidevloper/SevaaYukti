import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  CloudOff,
  Mic,
  Volume2,
  Database,
  Languages,
  Bell,
  Users,
  Syringe,
  Building,
  ArrowRight,
  MessageCircle,
  Send,
  Sparkles,
} from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import StatCounter from '../components/StatCounter';
import VoiceButton from '../components/VoiceButton';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [chatInput, setChatInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const quickSuggestions = [
    { label: t('smartReminders'), icon: Bell, onClick: null },
    { label: t('pregnancyCare'), icon: Users, onClick: () => navigate('/pregnancy-care') },
    { label: t('diseaseSymptoms'), icon: MessageCircle, onClick: () => navigate('/disease-symptoms') },
    { label: t('emergencyHelp'), icon: Bell, onClick: () => navigate('/emergency-help') },
  ];

  const howItWorksSteps = [
    {
      step: 1,
      title: t('step1'),
      icon: Users,
      color: 'from-primary-light to-primary',
    },
    {
      step: 2,
      title: t('step2'),
      icon: Database,
      color: 'from-accent-light to-accent',
    },
    {
      step: 3,
      title: t('step3'),
      icon: CloudOff,
      color: 'from-secondary-light to-secondary',
    },
    {
      step: 4,
      title: t('step4'),
      icon: Bell,
      color: 'from-warning to-primary',
    },
  ];

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // Voice recognition logic would go here
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    // Chat logic would go here
    setChatInput('');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cream via-white to-primary/5 py-16 md:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-textDark leading-tight">
              {t('heroTitle')}
            </h1>
            <div className="text-lg md:text-xl text-gray-600 font-medium odia-text">
              ସେବା ୟୁକ୍ତି - ଆପଣଙ୍କର ସେବା ୟୁକ୍ତି
            </div>
            <p className="text-xl md:text-2xl text-secondary font-semibold">
              {t('heroSubtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/chatbot">
                <Button
                  variant="primary"
                  size="large"
                  icon={MessageCircle}
                  className="min-w-[250px]"
                >
                  {t('talkToAI')}
                </Button>
              </Link>
              <Link to="/apply">
                <Button
                  variant="secondary"
                  size="large"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="min-w-[250px]"
                >
                  {t('applyForCard')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Chatbot Widget */}
      <section className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 animate-slideUp">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 text-primary mb-2">
                <Sparkles className="w-6 h-6" />
                <h2 className="text-2xl font-bold">AI Health Assistant</h2>
              </div>
              <p className="text-gray-600">
                {t('chatPlaceholder')}
              </p>
            </div>

            {/* Voice Input */}
            <div className="flex justify-center mb-6">
              <VoiceButton
                isListening={isListening}
                onClick={handleVoiceToggle}
                size="large"
              />
            </div>

            {isListening && (
              <div className="text-center mb-4">
                <p className="text-primary font-semibold animate-pulse">
                  {t('listening')}
                </p>
                <div className="flex justify-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-primary rounded-full animate-wave"
                      style={{
                        height: Math.random() * 30 + 10 + 'px',
                        animationDelay: `${i * 0.1}s`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {/* Text Input */}
            <form onSubmit={handleChatSubmit} className="mb-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={t('chatPlaceholder')}
                  className="input-field flex-1"
                />
                <Button
                  type="submit"
                  icon={Send}
                  className="!px-6"
                >
                  Send
                </Button>
              </div>
            </form>

            {/* Quick Suggestions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {quickSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={suggestion.onClick}
                  className="flex flex-col items-center gap-2 p-4 bg-cream hover:bg-primary/10 rounded-lg transition-colors border border-transparent hover:border-primary"
                >
                  <suggestion.icon className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium text-textDark text-center">
                    {suggestion.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={Syringe}
            title={t('vaccinationSchedule')}
            description={language === 'od' ? 'ଆପଣଙ୍କ ଶିଶୁର ଟୀକାକରଣ କାର୍ଯ୍ୟସୂଚୀ ଟ୍ରାକ୍ କରନ୍ତୁ' : 'Track your child\'s vaccination schedule'}
            onClick={() => navigate('/vaccination-schedule')}
          />
          <FeatureCard
            icon={CloudOff}
            title={t('offlineData')}
            description={t('offlineDataDesc')}
            onClick={() => navigate('/offline-data')}
          />
          <FeatureCard
            icon={Mic}
            title={t('voiceEntry')}
            description={language === 'en' 
              ? '🎤 ASHA speaks patient details → Auto-fills form → Saves time & avoids typing errors' 
              : '🎤 ଆଶା ରୋଗୀ ବିବରଣୀ କୁହନ୍ତି → ସ୍ୱୟଂଚାଳିତ ଫର୍ମ ପୂରଣ → ସମୟ ସଞ୍ଚୟ ଏବଂ ଟାଇପିଂ ତ୍ରୁଟି ଠାରୁ ଦୂରେ'}
          />
          <FeatureCard
            icon={Languages}
            title={t('multilingualSupport')}
            description={language === 'en' 
              ? '🌐 Toggle: English ↔ Odia | Voice also supports Odia | 👉 Huge rural impact' 
              : '🌐 ପରିବର୍ତ୍ତନ: ଇଂରାଜୀ ↔ ଓଡିଆ | ସ୍ୱର ମଧ୍ୟ ଓଡିଆ ସମର୍ଥନ କରେ | 👉 ବିଶାଳ ଗ୍ରାମୀଣ ପ୍ରଭାବ'}
          />
        </div>
      </section>

      {/* Statistics Dashboard */}
      <section className="bg-gradient-to-r from-primary/5 to-secondary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter target="0" label={t('registeredAshas')} suffix="+" />
            <StatCounter target="0" label={t('villagesCovered')} suffix="+" />
            <StatCounter target="0" label={t('patientsRegistered')} suffix="+" />
            <StatCounter target="0" label={t('vaccinationsTracked')} suffix="+" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-4">
            {t('howItWorks')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A simple 4-step process to ensure seamless healthcare delivery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorksSteps.map((step) => (
            <div key={step.step} className="relative">
              <div className="card text-center">
                <div className="relative inline-block mb-4">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-lg`}
                  >
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-textDark">{step.title}</h3>
              </div>
              {step.step < 4 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Rural Healthcare?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of ASHA workers and healthcare professionals making a
            difference in rural Odisha
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/asha-login">
              <Button
                variant="secondary"
                size="large"
                className="!bg-white !text-primary hover:!bg-gray-100"
              >
                {t('ashaLogin')}
              </Button>
            </Link>
            <Link to="/find-asha">
              <Button
                variant="outline"
                size="large"
                className="!border-white !text-white hover:!bg-white hover:!text-primary"
              >
                {t('knowYourAsha')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
