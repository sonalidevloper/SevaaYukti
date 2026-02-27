import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Phone,
  Truck,
  Building2,
  Users,
  MapPin,
  AlertTriangle,
  ArrowLeft,
  Navigation,
  Clock,
  Info,
} from 'lucide-react';
import Button from '../components/Button';
import Alert from '../components/Alert';
import { useNavigate } from 'react-router-dom';

const EmergencyHelp = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [selectedContact, setSelectedContact] = useState(null);

  // Emergency contacts
  const emergencyContacts = [
    {
      id: 1,
      name: '108 Ambulance',
      nameOd: '108 ଆମ୍ବୁଲାନ୍ସ',
      number: '108',
      description: 'Free 24/7 Emergency Ambulance Service',
      descriptionOd: 'ମାଗଣା ୨୪/୭ ଜରୁରୀ ଆମ୍ବୁଲାନ୍ସ ସେବା',
      icon: Truck,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      priority: 'high',
      available: '24/7',
    },
    {
      id: 2,
      name: 'ASHA Worker',
      nameOd: 'ASHA କର୍ମୀ',
      number: 'Find Your ASHA',
      description: 'Connect with your local ASHA health worker',
      descriptionOd: 'ଆପଣଙ୍କ ସ୍ଥାନୀୟ ASHA ସ୍ୱାସ୍ଥ୍ୟ କର୍ମୀଙ୍କ ସହିତ ସଂଯୋଗ କରନ୍ତୁ',
      icon: Users,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      priority: 'medium',
      action: 'navigate',
      route: '/find-asha',
    },
    {
      id: 3,
      name: 'Nearby PHC',
      nameOd: 'ନିକଟସ୍ଥ PHC',
      number: '104',
      description: 'Primary Health Center - Health Helpline',
      descriptionOd: 'ପ୍ରାଥମିକ ସ୍ୱାସ୍ଥ୍ୟ କେନ୍ଦ୍ର - ସ୍ୱାସ୍ଥ୍ୟ ହେଲ୍ପଲାଇନ',
      icon: Building2,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      priority: 'high',
      available: '24/7',
    },
    {
      id: 4,
      name: 'Medical Emergency',
      nameOd: 'ଚିକିତ୍ସା ଜରୁରୀକାଳୀନ',
      number: '102',
      description: 'Medical Emergency Helpline',
      descriptionOd: 'ଚିକିତ୍ସା ଜରୁରୀକାଳୀନ ହେଲ୍ପଲାଇନ',
      icon: Phone,
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      priority: 'high',
      available: '24/7',
    },
  ];

  // Nearby health centers (mock data)
  const nearbyHealthCenters = [
    {
      name: 'Bhubaneswar PHC',
      nameOd: 'ଭୁବନେଶ୍ୱର PHC',
      distance: '2.3 km',
      address: 'Unit 3, Bhubaneswar',
      addressOd: 'ୟୁନିଟ୍ 3, ଭୁବନେଶ୍ୱର',
      phone: '0674-2300000',
      available: 'Open',
      availableOd: 'ଖୋଲା',
    },
    {
      name: 'Saheed Nagar CHC',
      nameOd: 'ସହିଦ ନଗର CHC',
      distance: '4.1 km',
      address: 'Saheed Nagar, Bhubaneswar',
      addressOd: 'ସହିଦ ନଗର, ଭୁବନେଶ୍ୱର',
      phone: '0674-2301111',
      available: 'Open',
      availableOd: 'ଖୋଲା',
    },
    {
      name: 'Chandrasekharpur Hospital',
      nameOd: 'ଚନ୍ଦ୍ରଶେଖରପୁର ହସ୍ପିଟାଲ',
      distance: '5.8 km',
      address: 'Chandrasekharpur, Bhubaneswar',
      addressOd: 'ଚନ୍ଦ୍ରଶେଖରପୁର, ଭୁବନେଶ୍ୱର',
      phone: '0674-2302222',
      available: 'Open 24/7',
      availableOd: '24/7 ଖୋଲା',
    },
  ];

  // Handle call
  const handleCall = (number) => {
    if (number && number !== 'Find Your ASHA') {
      window.location.href = `tel:${number}`;
    }
  };

  // Handle navigation to Find ASHA
  const handleFindAsha = () => {
    navigate('/find-asha');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-textDark mb-3">
            {language === 'od' ? 'ଜରୁରୀକାଳୀନ ସହାୟତା' : 'Emergency Help'}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {language === 'od'
              ? 'ତୁରନ୍ତ ଚିକିତ୍ସା ସହାୟତା ଏବଂ ଜରୁରୀକାଳୀନ ସେବା ପାଆନ୍ତୁ'
              : 'Get immediate medical assistance and emergency services'}
          </p>

          {/* Emergency Alert */}
          <Alert
            type="error"
            message={
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <strong>
                    {language === 'od' ? '⚠️ ଗମ୍ଭୀର ଜରୁରୀକାଳୀନ:' : '⚠️ Severe Emergency:'}
                  </strong>
                  <p className="mt-1">
                    {language === 'od'
                      ? 'ଜୀବନ-ବିପଦଜନକ ପରିସ୍ଥିତିରେ, ତୁରନ୍ତ 108 ଡାୟଲ କରନ୍ତୁ କିମ୍ବା ନିକଟତମ ହସ୍ପିଟାଲକୁ ଯାଆନ୍ତୁ।'
                      : 'In life-threatening situations, immediately dial 108 or visit the nearest hospital.'}
                  </p>
                </div>
              </div>
            }
          />
        </div>

        {/* Emergency Contacts */}
        <div className="max-w-4xl mx-auto space-y-6 mb-12">
          <h2 className="text-2xl font-bold text-textDark mb-6 flex items-center gap-2">
            <Phone className="w-6 h-6 text-red-500" />
            {language === 'od' ? 'ଜରୁରୀକାଳୀନ ସମ୍ପର୍କ' : 'Emergency Contacts'}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {emergencyContacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <div
                  key={contact.id}
                  className="card p-6 hover:shadow-xl transition-all cursor-pointer border-2 hover:border-red-300"
                  onClick={() => {
                    if (contact.action === 'navigate') {
                      handleFindAsha();
                    } else {
                      handleCall(contact.number);
                    }
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`${contact.color} ${contact.hoverColor} w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-colors`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-textDark mb-1">
                        {language === 'od' ? contact.nameOd : contact.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {language === 'od' ? contact.descriptionOd : contact.description}
                      </p>
                      <div className="flex items-center gap-4">
                        {contact.number !== 'Find Your ASHA' && (
                          <span className="text-2xl font-bold text-red-600">
                            {contact.number}
                          </span>
                        )}
                        {contact.available && (
                          <span className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                            <Clock className="w-3 h-3" />
                            {contact.available}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button
                      variant={contact.priority === 'high' ? 'primary' : 'secondary'}
                      fullWidth
                      icon={contact.action === 'navigate' ? Navigation : Phone}
                      className={contact.priority === 'high' ? '!bg-red-500 hover:!bg-red-600' : ''}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (contact.action === 'navigate') {
                          handleFindAsha();
                        } else {
                          handleCall(contact.number);
                        }
                      }}
                    >
                      {contact.action === 'navigate'
                        ? (language === 'od' ? 'ASHA ଖୋଜନ୍ତୁ' : 'Find ASHA')
                        : (language === 'od' ? 'ତୁରନ୍ତ କଲ୍ କରନ୍ତୁ' : 'Call Now')}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nearby Health Centers */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-textDark mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-blue-500" />
            {language === 'od' ? 'ନିକଟସ୍ଥ ସ୍ୱାସ୍ଥ୍ୟ କେନ୍ଦ୍ର' : 'Nearby Health Centers'}
          </h2>

          <Alert
            type="info"
            message={
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  {language === 'od'
                    ? 'ଏହି ତାଲିକା ଆପଣଙ୍କ ବର୍ତ୍ତମାନ ଅବସ୍ଥାନ ଉପରେ ଆଧାରିତ। ନିର୍ଦ୍ଦିଷ୍ଟ ସ୍ଥାନ ଅନୁମତି ଦିଅନ୍ତୁ ଅଧିକ ସଠିକ ଫଳାଫଳ ପାଇଁ।'
                    : 'This list is based on your current location. Allow location permissions for more accurate results.'}
                </div>
              </div>
            }
          />

          <div className="space-y-4">
            {nearbyHealthCenters.map((center, index) => (
              <div
                key={index}
                className="card p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Building2 className="w-6 h-6 text-blue-500" />
                      <h3 className="text-xl font-bold text-textDark">
                        {language === 'od' ? center.nameOd : center.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4" />
                      {language === 'od' ? center.addressOd : center.address}
                    </p>
                    <p className="text-gray-500 text-sm flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {center.phone}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600 mb-1">
                      {center.distance}
                    </div>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      {language === 'od' ? center.availableOd : center.available}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    icon={Phone}
                    onClick={() => handleCall(center.phone)}
                  >
                    {language === 'od' ? 'କଲ୍ କରନ୍ତୁ' : 'Call'}
                  </Button>
                  <Button
                    variant="outline"
                    icon={Navigation}
                    onClick={() => {
                      // Open in Google Maps (mock)
                      alert(language === 'od' 
                        ? 'ଗୁଗଲ୍ ମାନଚିତ୍ରରେ ଦିଗଦର୍ଶନ ଖୋଲୁଛି...'
                        : 'Opening directions in Google Maps...');
                    }}
                  >
                    {language === 'od' ? 'ଦିଗଦର୍ଶନ' : 'Directions'}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Map Placeholder */}
          <div className="card p-8 text-center bg-gradient-to-br from-blue-50 to-cyan-50">
            <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-textDark mb-2">
              {language === 'od' ? 'ମାନଚିତ୍ର ଦୃଶ୍ୟ' : 'Map View'}
            </h3>
            <p className="text-gray-600 mb-4">
              {language === 'od'
                ? 'ମାନଚିତ୍ରରେ ନିକଟତମ ସ୍ୱାସ୍ଥ୍ୟ କେନ୍ଦ୍ର ଦେଖନ୍ତୁ'
                : 'View nearest health centers on map'}
            </p>
            <Button
              variant="primary"
              icon={MapPin}
              onClick={() => {
                alert(language === 'od'
                  ? 'ମାନଚିତ୍ର ଦୃଶ୍ୟ ଖୋଲୁଛି...'
                  : 'Opening map view...');
              }}
            >
              {language === 'od' ? 'ମାନଚିତ୍ର ଖୋଲନ୍ତୁ' : 'Open Map'}
            </Button>
          </div>

          {/* Back Button */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              icon={ArrowLeft}
              onClick={() => navigate(-1)}
            >
              {language === 'od' ? 'ପଛକୁ' : 'Back'}
            </Button>
          </div>

          {/* Additional Help Info */}
          <div className="card p-6 bg-yellow-50 border-l-4 border-yellow-500">
            <h3 className="font-bold text-textDark mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-yellow-600" />
              {language === 'od' ? 'ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ସୂଚନା:' : 'Important Information:'}
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">•</span>
                <span>
                  {language === 'od'
                    ? '108 - ମାଗଣା ଜରୁରୀକାଳୀନ ଆମ୍ବୁଲାନ୍ସ (ସମସ୍ତ ପ୍ରକାର ଜରୁରୀକାଳୀନ ପାଇଁ)'
                    : '108 - Free Emergency Ambulance (For all types of emergencies)'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">•</span>
                <span>
                  {language === 'od'
                    ? '104 - ସ୍ୱାସ୍ଥ୍ୟ ହେଲ୍ପଲାଇନ (ଚିକିତ୍ସା ପରାମର୍ଶ ଏବଂ ମାର୍ଗଦର୍ଶନ)'
                    : '104 - Health Helpline (Medical advice and guidance)'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">•</span>
                <span>
                  {language === 'od'
                    ? '102 - ଚିକିତ୍ସା ଜରୁରୀକାଳୀନ (ଗର୍ଭବତୀ ମହିଳା ଏବଂ ଶିଶୁ ପାଇଁ)'
                    : '102 - Medical Emergency (For pregnant women and children)'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">•</span>
                <span>
                  {language === 'od'
                    ? 'ସମସ୍ତ ସେବା ୨୪/୭ ଉପଲବ୍ଧ ଏବଂ ସମ୍ପୂର୍ଣ୍ଣ ମାଗଣା'
                    : 'All services are available 24/7 and completely free'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyHelp;
