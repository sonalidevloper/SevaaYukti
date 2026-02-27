import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const translations = {
  en: {
    // Navigation
    about: 'About',
    notices: 'Notices',
    applyOnline: 'Apply Online',
    knowYourAsha: 'Know Your ASHA',
    ashaLogin: 'ASHA Login',
    home: 'Home',
    
    // Hero Section
    heroTitle: 'SwasthyaSaathi - Your Health Companion',
    heroSubtitle: 'Empowering Rural Healthcare in Odisha',
    talkToAI: 'Talk to AI Health Assistant',
    applyForCard: 'Apply for Swasthya Saathi Card',
    
    // Chatbot
    chatPlaceholder: 'Ask about health symptoms, vaccination...',
    vaccinationSchedule: 'Vaccination Schedule',
    pregnancyCare: 'Pregnancy Care',
    diseaseSymptoms: 'Disease Symptoms',
    emergencyHelp: 'Emergency Help',
    listening: 'Listening...',
    
    // Features
    offlineData: 'Offline Data Collection',
    offlineDataDesc: 'Record patient data even without internet connectivity',
    voiceEntry: 'Voice-Based Entry',
    voiceEntryDesc: 'Speak to enter data - no typing needed',
    multilingualSupport: 'Multilingual Support',
    multilingualDesc: 'Available in English and Odia languages',
    smartReminders: 'Smart Reminders',
    smartRemindersDesc: 'Automated alerts for vaccinations and checkups',
    
    // Statistics
    registeredAshas: 'Registered ASHAs',
    villagesCovered: 'Villages Covered',
    patientsRegistered: 'Patients Registered',
    vaccinationsTracked: 'Vaccinations Tracked',
    
    // How It Works
    howItWorks: 'How It Works',
    step1: 'ASHA visits household',
    step2: 'Records data offline',
    step3: 'Auto-sync when online',
    step4: 'Alerts & reminders',
    
    // Forms
    personalDetails: 'Personal Details',
    fullName: 'Full Name',
    age: 'Age',
    gender: 'Gender',
    mobileNumber: 'Mobile Number',
    address: 'Address',
    village: 'Village',
    pinCode: 'PIN Code',
    submit: 'Submit',
    next: 'Next',
    previous: 'Previous',
    save: 'Save',
    cancel: 'Cancel',
    
    // Status
    online: 'Online',
    offline: 'Offline',
    syncing: 'Syncing...',
    lastSynced: 'Last synced',
    pendingSync: 'pending sync',
    
    // Common
    loading: 'Loading...',
    pleaseWait: 'Please wait...',
    search: 'Search',
    filter: 'Filter',
    viewMore: 'View More',
    readMore: 'Read More',
    contactUs: 'Contact Us',
    helpSupport: 'Help & Support',
    privacyPolicy: 'Privacy Policy',
    
    // ASHA Dashboard
    welcome: 'Welcome',
    todaysVisits: "Today's Visits",
    pendingVaccinations: 'Pending Vaccinations',
    highRiskCases: 'High-Risk Cases',
    registerNewPatient: 'Register New Patient',
    patients: 'Patients',
    visits: 'Visits',
    vaccinations: 'Vaccinations',
    reports: 'Reports',
    profile: 'Profile',
    
    // Vaccination
    completed: 'Completed',
    upcoming: 'Upcoming',
    overdue: 'Overdue',
    dueDate: 'Due Date',
    
    // Alerts
    workingOffline: "You're offline - Data will sync when connected",
    syncSuccess: 'Data synced successfully',
    syncFailed: 'Sync failed. Please try again',
  },
  od: {
    // Navigation (Odia)
    about: 'ବିଷୟରେ',
    notices: 'ବିଜ୍ଞପ୍ତି',
    applyOnline: 'ଅନଲାଇନ୍ ଆବେଦନ',
    knowYourAsha: 'ଆପଣଙ୍କ ଆଶା ଜାଣନ୍ତୁ',
    ashaLogin: 'ଆଶା ଲଗଇନ୍',
    home: 'ହୋମ୍',
    
    // Hero Section
    heroTitle: 'ସ୍ୱାସ୍ଥ୍ୟ ସାଥୀ - ଆପଣଙ୍କର ସ୍ୱାସ୍ଥ୍ୟ ସାଥୀ',
    heroSubtitle: 'ଓଡିଶାରେ ଗ୍ରାମୀଣ ସ୍ୱାସ୍ଥ୍ୟସେବାକୁ ସଶକ୍ତ କରିବା',
    talkToAI: 'AI ସ୍ୱାସ୍ଥ୍ୟ ସହାୟକ ସହିତ କଥା ହୁଅନ୍ତୁ',
    applyForCard: 'ସ୍ୱାସ୍ଥ୍ୟ ସାଥୀ କାର୍ଡ ପାଇଁ ଆବେଦନ କରନ୍ତୁ',
    
    // Chatbot
    chatPlaceholder: 'ସ୍ୱାସ୍ଥ୍ୟ ଲକ୍ଷଣ, ଟୀକାକରଣ ବିଷୟରେ ପଚାରନ୍ତୁ...',
    vaccinationSchedule: 'ଟୀକାକରଣ ସୂଚୀ',
    pregnancyCare: 'ଗର୍ଭାବସ୍ଥା ଯତ୍ନ',
    diseaseSymptoms: 'ରୋଗର ଲକ୍ଷଣ',
    emergencyHelp: 'ଜରୁରୀ ସହାୟତା',
    listening: 'ଶୁଣୁଛି...',
    
    // Features
    offlineData: 'ଅଫଲାଇନ୍ ତଥ୍ୟ ସଂଗ୍ରହ',
    offlineDataDesc: 'ଇଣ୍ଟରନେଟ୍ ବିନା ରୋଗୀ ତଥ୍ୟ ରେକର୍ଡ କରନ୍ତୁ',
    voiceEntry: 'ସ୍ୱର-ଆଧାରିତ ପ୍ରବେଶ',
    voiceEntryDesc: 'ତଥ୍ୟ ପ୍ରବେଶ କରିବାକୁ କୁହନ୍ତୁ - ଟାଇପିଂ ଆବଶ୍ୟକ ନାହିଁ',
    multilingualSupport: 'ବହୁଭାଷୀ ସମର୍ଥନ',
    multilingualDesc: 'ଇଂରାଜୀ ଏବଂ ଓଡିଆ ଭାଷାରେ ଉପଲବ୍ଧ',
    smartReminders: 'ସ୍ମାର୍ଟ ରିମାଇଣ୍ଡର୍',
    smartRemindersDesc: 'ଟୀକାକରଣ ଏବଂ ଯାଞ୍ଚ ପାଇଁ ସ୍ୱୟଂଚାଳିତ ସତର୍କତା',
    
    // Statistics
    registeredAshas: 'ପଞ୍ଜୀକୃତ ଆଶା',
    villagesCovered: 'ଗ୍ରାମ ଆଚ୍ଛାଦିତ',
    patientsRegistered: 'ପଞ୍ଜୀକୃତ ରୋଗୀ',
    vaccinationsTracked: 'ଟୀକାକରଣ ଟ୍ରାକ୍ ହୋଇଛି',
    
    // How It Works
    howItWorks: 'ଏହା କିପରି କାମ କରେ',
    step1: 'ଆଶା ଘର ପରିଦର୍ଶନ କରନ୍ତି',
    step2: 'ଅଫଲାଇନ୍ ତଥ୍ୟ ରେକର୍ଡ କରନ୍ତି',
    step3: 'ଅନଲାଇନ୍ ସମୟରେ ସ୍ୱୟଂ-ସିଙ୍କ୍',
    step4: 'ସତର୍କତା ଏବଂ ରିମାଇଣ୍ଡର୍',
    
    // Forms
    personalDetails: 'ବ୍ୟକ୍ତିଗତ ବିବରଣୀ',
    fullName: 'ପୂର୍ଣ୍ଣ ନାମ',
    age: 'ବୟସ',
    gender: 'ଲିଙ୍ଗ',
    mobileNumber: 'ମୋବାଇଲ୍ ନମ୍ବର',
    address: 'ଠିକଣା',
    village: 'ଗ୍ରାମ',
    pinCode: 'ପିନ୍ କୋଡ୍',
    submit: 'ଦାଖଲ କରନ୍ତୁ',
    next: 'ପରବର୍ତ୍ତୀ',
    previous: 'ପୂର୍ବବର୍ତ୍ତୀ',
    save: 'ସଂରକ୍ଷଣ କରନ୍ତୁ',
    cancel: 'ବାତିଲ୍ କରନ୍ତୁ',
    
    // Status
    online: 'ଅନଲାଇନ୍',
    offline: 'ଅଫଲାଇନ୍',
    syncing: 'ସିଙ୍କ୍ ହେଉଛି...',
    lastSynced: 'ଶେଷ ସିଙ୍କ୍',
    pendingSync: 'ସିଙ୍କ୍ ବାକି',
    
    // Common
    loading: 'ଲୋଡ୍ ହେଉଛି...',
    pleaseWait: 'ଦୟାକରି ଅପେକ୍ଷା କରନ୍ତୁ...',
    search: 'ଖୋଜନ୍ତୁ',
    filter: 'ଫିଲ୍ଟର୍',
    viewMore: 'ଅଧିକ ଦେଖନ୍ତୁ',
    readMore: 'ଅଧିକ ପଢନ୍ତୁ',
    contactUs: 'ଯୋଗାଯୋଗ କରନ୍ତୁ',
    helpSupport: 'ସହାୟତା ଏବଂ ସମର୍ଥନ',
    privacyPolicy: 'ଗୋପନୀୟତା ନୀତି',
    
    // ASHA Dashboard
    welcome: 'ସ୍ୱାଗତ',
    todaysVisits: 'ଆଜିର ପରିଦର୍ଶନ',
    pendingVaccinations: 'ବାକି ଟୀକାକରଣ',
    highRiskCases: 'ଉଚ୍ଚ ବିପଦ ମାମଲା',
    registerNewPatient: 'ନୂତନ ରୋଗୀ ପଞ୍ଜୀକରଣ କରନ୍ତୁ',
    patients: 'ରୋଗୀ',
    visits: 'ପରିଦର୍ଶନ',
    vaccinations: 'ଟୀକାକରଣ',
    reports: 'ରିପୋର୍ଟ',
    profile: 'ପ୍ରୋଫାଇଲ୍',
    
    // Vaccination
    completed: 'ସମ୍ପୂର୍ଣ୍ଣ',
    upcoming: 'ଆଗାମୀ',
    overdue: 'ବିଳମ୍ବିତ',
    dueDate: 'ନିର୍ଦ୍ଧାରିତ ତାରିଖ',
    
    // Alerts
    workingOffline: 'ଆପଣ ଅଫଲାଇନ୍ - ସଂଯୁକ୍ତ ହେଲେ ତଥ୍ୟ ସିଙ୍କ୍ ହେବ',
    syncSuccess: 'ତଥ୍ୟ ସଫଳତାର ସହିତ ସିଙ୍କ୍ ହୋଇଛି',
    syncFailed: 'ସିଙ୍କ୍ ବିଫଳ ହୋଇଛି। ଦୟାକରି ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ',
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [isOffline, setIsOffline] = useState(false);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'od' : 'en'));
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
    isOffline,
    setIsOffline,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
